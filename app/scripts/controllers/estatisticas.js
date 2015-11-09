'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, $q, RestApi, $log, containsObject, formData, appConfig, $locale,  $mdSidenav, $mdUtil, infoService) {

    if ( $cookies.get('dataUser') ) {
      Auth.setUser(JSON.parse($cookies.get('dataUser')));
      $rootScope.dataUser = {};
      $rootScope.dataUser.userName = Auth.getUser();
    }

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
      if(!value && oldValue) {
        $log.info('User Disconnected');
        $location.path('#/');
      }
      
      var dataUser = {};
      
      if(value) {
        $log.info('User Connected');
        Auth.setUser(JSON.parse($cookies.get('dataUser')));
        dataUser.userName = Auth.getUser();
        $rootScope.dataUser = dataUser;
        //Do something when the user is connected
      }
    }, true);

    Auth.isLoggedIn() ? $rootScope.logged = true : $rootScope.logged = false;

    $scope.tabStats = true;

    $scope.choroData;
    $scope.carregar = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
      
      if( ! ( containsObject ( $scope.categorias, 'Todos', 'id') ) ){ $scope.categorias.push({id: 'Todos' , nome: 'Todos'}) }

      $scope.codigoCategoria = [];

      angular.forEach($scope.categorias, function(value){ $scope.codigoCategoria.push(value.id) });

    });

    $scope.solicitar = solicitar;
    $scope.listSubcategoria = listSubcategoria;
    $scope.defineRequest = defineRequest;
    $scope.toggleSidenav = toggleSidenav;

    $scope.regioes = formData.regioes;
    $scope.estados = formData.estados;
    $scope.anos = formData.anos;

    if( ! ( containsObject ( $scope.regioes, 'Todas', 'nome' ) ) )
      { $scope.regioes.push({nome: 'Todas'}) };

    //Help info in scope vars
    $scope.atividadeCategoria = infoService.atividadeCategoria;
    $scope.atividadeUF = infoService.atividadeUF;
    $scope.atividadeMapa = infoService.atividadeMapa;
    $scope.pessoaPorte = infoService.pessoaPorte;
    $scope.pessoaRegularidade = infoService.pessoaRegularidade;
    $scope.pessoaMapa = infoService.pessoaMapa;
    $scope.inscricaoAnoAtual = infoService.inscricaoAnoAtual;
    $scope.inscricaoAnoTotal = infoService.inscricaoAnoTotal;
    $scope.inscricaoSerie = infoService.inscricaoSerie;

    /**
     * Getting list of each subcategoria in categoria on param
     * This function add Todos on array of subcategorias
     * @param categoria
     * @returns {*}
    */
    function listSubcategoria(categoria){
      $scope.chart.subCategoria = '';
      $scope.chart.atividade = null;
      if(categoria.id !== 'Todos'){
        $scope.atividades = categoria.subcategorias;
        if(!(containsObject($scope.atividades, 'Todos', 'id'))){
          $scope.atividades.push({codigo: 'Todos', id:'Todos', nome: 'Todos'});
        }
      }
    }

    /**
     * Getting type of request that will be maded
     * This function is activeted when tabs is selected on stats view
     * Returning values to scope, to a better user experience
     * @param val
     * @returns {*}
    */
    function toggleSidenav(){ $mdSidenav('left').toggle() }

    function defineRequest(val){
      $scope.request = val;

      if(val !== 'atividades'){
        $rootScope.column = false;
      } else {
        $rootScope.column = true;
      }

    }

    function barData(object, features){
      var data = {};

      if (!features)
        object = object.features.map(function(item){return item.properties}); 

      var dado = [];
      var labels = [];
      // var series = [];

      angular.forEach(object, function(value){
        labels.push(value.sigla);
        dado.push(value.num_atividades);
        // series.push(value.series);
      });

      data.data = [dado];
      data.labels = labels;
      // data.series = series;
      return data;
    }

    function pieData(object, optional){
      var data = {},
        dado = [],
        labels = [],
        size=0;

      object.sort(function(a,b) {
        return b.quantidade - a.quantidade;
      })

      if(!!optional){
        angular.forEach(object, function(value){
          dado.push(value.quantidade);
          labels.push(value.nome);
        })
      } else {
        angular.forEach(object, function(value){
          if(value.quantidade != 0){
            dado.push(value.quantidade);
            labels.push(value.nome);
          }
        })
      }

      if(optional){
        if(labels[0] == 'irregulares'){
          labels[0] ? labels[0] = 'Não Possui Certificado de Regularidade Válido': labels[0];
          labels[1] ? labels[1] = 'Possui Certificado de Regularidade Válido': labels[1];
          labels.reverse();
          dado.reverse();
        } else {
          labels[0] ? labels[0] = 'Possui Certificado de Regularidade Válido': labels[0];
          labels[0] ? labels[1] = 'Possui Certificado de Regularidade Válido': labels[1];
        }
      }

      dado.forEach(function(el){
        if(el > 0) size++;
      })

      if(size){
        data.data = dado;
        data.labels = labels;
      } else {
        data.data = [null];
        data.labels = labels;
      }

      return data;
    }

    function lineData(object, optional){
      var data = {};
      var acumulado=0;

      var dado = [];
      var labels = [];

      object.sort(function(a,b) {
        return a.ano - b.ano;
      });


      angular.forEach(object, function(value){
        dado.push(value.quantidade);
        labels.push(value.ano);
      });

      data.data = [dado];
      data.labels = labels;

      return data;
    }

    function lastParam(list, type){
      var values = '';
       if(type == 'categoria'){
        list = list.map(function(data){
          return data.id
        });
      } else{
        list = list.map(function(data){
          return data.categoria + '-' + data.codigo;
        });
      }

      angular.forEach(list, function(value){
        values += value + ', ';
      })

      return values.substring(0,(values.length - 2));
    }

    function solicitar(estados, categorias, atividades, ano, columns){

      $("[ctf-popover]").popover("hide");

      $scope.toggleSidenav();
      $scope.loading = true;

      var arrEstado ='',
        arrSubcategoria='',
        arrCategoria='',
        arrAno='';
      
      if ($scope.request == 'atividades') {
        $scope.carregar.atividades = true;
      } else if ($scope.request == 'empresas'){
        $scope.carregar.empresas = true;
      } else if ($scope.request == 'inscricoes'){
        $scope.carregar.inscricoes = true;
      } 

      (!ano || ano == 'Todos') ? arrAno = '' : arrAno = ano;

      angular.forEach(estados, function(value){
        arrEstado += value.sigla + ',';
      });
      angular.forEach(atividades, function(value){
        arrSubcategoria += value.id + ',';
      });
      angular.forEach(categorias, function(value){
        arrCategoria += value.id + ',';
      });

      arrEstado = arrEstado.substring(0,(arrEstado.length - 1));
      arrCategoria = arrCategoria.substring(0,(arrCategoria.length - 1));
      arrSubcategoria = arrSubcategoria.substring(0,(arrSubcategoria.length - 1));



      $scope.lastParams = {};
      $scope.lastParams.Estados = arrEstado;
      $scope.lastParams.Atividades = lastParam(atividades, 'atividade');
      $scope.lastParams.Categorias = lastParam(categorias, 'categoria');
      $scope.lastParams.Ano = ano;



      switch($scope.request){
        case 'atividades':
          $scope.lastAtividades = true;

          var rest2Response = RestApi.getGeoEstatisticas({type: 'atividades-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart1 = barData(data);
            $scope.chart1.export = appConfig.apiUrl + '/estatisticas/atividades-uf/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria' + arrCategoria + '&subcategoria=' +arrSubcategoria;
            $scope.chart1.describe = 'geo-ctf-app-atividades-por-categoria.csv';
            $scope.choroAtividades = data;
          }).$promise;

          var rest1Response = RestApi.getEstatisticas({type: 'subcategorias', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart2 = {};
            $scope.chart2.data = data;
            $scope.chart2.totalColumns = columns;
            $scope.chart2.categorias = $scope.categorias;
            $scope.chart2.describe = 'geo-ctf-app-atividades-por-uf.csv';
            $scope.chart2.export = appConfig.apiUrl + '/estatisticas/subcategorias/?format=csv&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria + '&ano=' + arrAno;
          }).$promise;

         $q.all([rest1Response,rest2Response]).then(function(){
            $scope.carregar.atividades = false;
            $scope.loading = false;
          });

          break;
        case 'empresas':
          var rest1Response = RestApi.getEstatisticas({type: 'porte', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart3 = pieData(data);
            $scope.chart3.export = appConfig.apiUrl + '/estatisticas/porte/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;
          }).$promise;

          var rest2Response = RestApi.getEstatisticas({type: 'regularidade', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart4 = pieData(data, true);
            $scope.chart4.export = appConfig.apiUrl + '/estatisticas/regularidade/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;
          }).$promise;
      
          var rest3Response = RestApi.getGeoEstatisticas({type: 'empresas-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.choroEmpresas = data;
          }).$promise;

          $q.all([rest1Response,rest2Response, rest3Response]).then(function(){
            /*
            -- Building empresa Map --
            Creating objects with labels and selects from previews query
            object filterObject to get params and passing this to directive
            see choroMap directive
            */
            $scope.filterObject = {};
            $scope.filterObject.filters = [];

            var filterElement = {};
            filterElement.name = 'Porte'
            filterElement.values = $scope.chart3.labels.map(function(value){return value;});
            filterElement.values.unshift('');
            filterElement.selected = '';
            filterElement.dbfield = 'porte';
            filterElement.description = 'Filtrar por porte no mapa estatístico';
            $scope.filterObject.filters.push(filterElement);

            filterElement = {};
            filterElement.name = 'Regularidade';
            filterElement.values = $scope.chart4.labels.map(function(value){return value;});
            filterElement.values.unshift('');
            filterElement.dbfield = 'regularidade';
            filterElement.selected = '';
            filterElement.description = 'Filtrar por regularidade no mapa estatístico';
            $scope.filterObject.filters.push(filterElement);

            $scope.filterObject.restFunction = 'getGeoEstatisticas';
            $scope.filterObject.restParam = {type: 'empresas-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno};
            /* -- End of Building empresa Map -- */
            $scope.carregar.empresas = false;
            $scope.loading = false;
          });
          break;
        case 'inscricoes':
          var rest1Response = RestApi.getEstatisticas({type: 'inscricoes-uf-ano/', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart5 = barData(data, true);
          }).$promise;

          var rest2Response = RestApi.getEstatisticas({type: 'inscricoes-uf-total/', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart6 = barData(data, true);
          }).$promise;

          var rest3Response = RestApi.getEstatisticas({type: 'inscricoes-ano/', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart7 = lineData(data);
          }).$promise;
          
          $q.all([rest1Response, rest2Response, rest3Response]).then(function(){
            $scope.chart5.describe = 'geo-ctf-app-inscricoes-por-uf.csv';
            $scope.chart5.export = appConfig.apiUrl + '/estatisticas/inscricoes-uf-ano/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;

            $scope.chart6.describe = 'geo-ctf-app-inscricoes-por-uf-total.csv';
            $scope.chart6.export = appConfig.apiUrl + '/estatisticas/inscricoes-uf-total/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;

            $scope.chart7.describe = 'geo-ctf-app-inscricoes-total.csv';
            $scope.chart7.export = appConfig.apiUrl + '/estatisticas/inscricoes-ano/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;

            $scope.carregar.inscricoes = false;
            $scope.loading = false;
          });
           break;
        default:
          console.log("Escolha fora das seleções possíveis");
      }
    }

      $rootScope.ok = function() {
          $mdDialog.hide();
      }


  });