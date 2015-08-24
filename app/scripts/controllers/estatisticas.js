'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, $q, RestApi, $log, containsObject, formData, appConfig, $locale) {

    if ($cookies.get('dataUser')) {
      Auth.setUser(JSON.parse($cookies.get('dataUser')));
      $rootScope.dataUser = {};
      $rootScope.dataUser.userName = Auth.getUser();
    }

    $rootScope.logged = Auth.isLoggedIn() ? true : false;


    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
      if(!value && oldValue) {
        console.log('Disconnect');
        $location.path('#/');
      }
      if(value) {
        console.log('Connect');
        Auth.setUser(JSON.parse($cookies.get('dataUser')));
        $rootScope.dataUser = {};
        $rootScope.dataUser.userName = Auth.getUser();
       //Do something when the user is connected
      }
    }, true);


    $scope.tabStats = true;

    $cookies.SystemName = 'CTF-APP-GEO';
    $rootScope.SystemName = $cookies.SystemName;

    $scope.regioes = formData.regioes;
    $scope.estados = formData.estados;
    $scope.anos = formData.anos;

    if(!(containsObject($scope.regioes, 'Todas', 'nome'))){
      $scope.regioes.push({nome: 'Todas'});
    }

    $scope.choroData;

    $scope.carregar = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
      if(!(containsObject($scope.categorias, 'Todos', 'id'))){
        $scope.categorias.push({id: 'Todos' , nome: 'Todos'});
      }
      $scope.codigoCategoria = [];
      angular.forEach($scope.categorias, function(value){
        $scope.codigoCategoria.push(value.id);
      });
    });

    /**
     * Getting list of each subcategoria in categoria on param
     * This function add Todos on array of subcategorias
     * @param categoria
     * @returns {*}
    */
    $scope.listSubcategoria = function(categoria){
      $scope.chart.subCategoria = '';
      $scope.chart.atividade = null;
      if(categoria.id !== 'Todos'){
        $scope.atividades = categoria.subcategorias;
        if(!(containsObject($scope.atividades, 'Todos', 'id'))){
          $scope.atividades.push({codigo: 'Todos', id:'Todos', nome: 'Todos'});
        }
      }
    };

    /**
     * Getting type of request that will be maded
     * This function is activeted when tabs is selected on stats view
     * Returning values to scope, to a better user experience
     * @param val
     * @returns {*}
    */

    $scope.defineRequest = function (val){
      $scope.request = val;
      // if(val !== 'atividades'){
      //   $rootScope.column = false;
      // } else {
      //   $rootScope.column = true;
      // }
    };


    function barData(object){
      var data = {};

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
      var data = {};

      var dado = [];
      var labels = [];

      object.sort(function(a,b) {
        return b.quantidade - a.quantidade;
      });

      angular.forEach(object, function(value){
          if(value.quantidade != 0){
        // angular.forEach(value, function(v, k){
            dado.push(value.quantidade);
            labels.push(value.nome);
        // })
          }
      });

      if(optional){
        if(labels[0] == 'irregulares'){
          labels.reverse();
          dado.reverse();
        }
      }

      data.data = dado;
      data.labels = labels;

      return data;

    }

    $scope.solicitar = function(estados, categorias, atividades, ano, columns){

      $scope.loading = true;

      var arrEstado = '';
      var arrSubcategoria = '';
      var arrCategoria = '';
      var arrAno;

      if ($scope.request == 'atividades') {
        $scope.carregar.atividades = true;
      } else if ($scope.request == 'empresas'){
        $scope.carregar.empresas = true;
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

      switch($scope.request){
        case 'atividades':
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
            console.log(data);
            $scope.chart4.export = appConfig.apiUrl + '/estatisticas/regularidade/?format=csv&ano=' + arrAno + '&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;
          }).$promise;
      
          var rest3Response = RestApi.getGeoEstatisticas({type: 'empresas-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.choroEmpresas = data;
            $scope.filterObject = {};
            $scope.filterObject.filters = [];
          }).$promise;

          $q.all([rest1Response,rest2Response, rest3Response]).then(function(){
            var filterElement = {};
            filterElement.name = 'Porte'
            filterElement.values = $scope.chart3.labels.map(function(value){return value;});
            filterElement.values.unshift('');
            filterElement.selected = '';
            filterElement.dbfield = 'porte';
            $scope.filterObject.filters.push(filterElement);

            filterElement = {};
            filterElement.name = 'Regularidade';
            filterElement.values = $scope.chart4.labels.map(function(value){return value;});
            filterElement.values.unshift('');
            filterElement.dbfield = 'regularidade';
            filterElement.selected = '';
            $scope.filterObject.filters.push(filterElement);
            $scope.filterObject.restFunction = 'getGeoEstatisticas';
            $scope.filterObject.restParam = {type: 'empresas-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno};

            $scope.carregar.empresas = false;
            $scope.loading = false;
          });

          break;
        default:
          break;
      }

    };
  
  });
