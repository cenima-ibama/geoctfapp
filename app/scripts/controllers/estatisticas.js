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
    
    $scope.choroData;

    $scope.carregar = {};
    // $scope.export = {};
    // $scope.chart = {};

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
      if(val !== 'atividades'){
        $rootScope.column = false;
      } else {
        $rootScope.column = true;
      }
    };


    $scope.solicitar = function(estados, categorias, atividades, ano, columns){

      $scope.loading = true;

      var arrEstado = '';
      var arrCategoria = '';
      var arrSubcategoria = '';
      var arrAno;

      var rest1Response;
      var rest2Response;
    
      if ($scope.request == 'atividades') {
        $scope.carregar.atividades = true;
      } else if ($scope.request == 'empresa'){
        $scope.carregar.empresas = true;
      }

      if(!ano || ano === 'Todos'){
        arrAno = '';
      } else{
        arrAno = ano;
      }

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

      function pieData(object){
        var data = {};

        var dado = [];
        var labels = [];

        angular.forEach(object, function(value){ 
          angular.forEach(value, function(v, k){
            dado.push(v);
            labels.push(k);
          })
        });

        data.data = dado;
        data.labels = labels;

        return data;

      }

      var exportCSV = {};

      switch($scope.request){
        case 'atividades':

          var rest2Response = RestApi.getObject({type: 'geoestatistica-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart1 = barData(data);
            $scope.chart1.export = appConfig.apiUrl + '/estatistica-uf/?format=csv&uf=' + arrEstado + '&categoria' + arrCategoria + '&subcategoria=' +arrSubcategoria;
            $scope.chart1.describe = 'geo-ctf-app-atividades-por-categoria.csv';
            $scope.choroData = data;
          }).$promise;

          var rest1Response = RestApi.get({type: 'estatistica-subcategoria', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart2 = {};
            $scope.chart2.data = data;
            $scope.chart2.totalColumns = columns;
            $scope.chart2.categorias = $scope.categorias;
            $scope.chart2.describe = 'geo-ctf-app-atividades-por-uf.csv';
            $scope.chart2.export = appConfig.apiUrl + '/estatistica-subcategoria/?format=csv&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;
          }).$promise;

          $q.all([rest1Response, rest2Response]).then(function(){
            
          });

          break;
        default:
          var rest1Response = RestApi.get({type: 'estatistica-porte', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.chart3 = pieData(data);
            // $scope.chart3.name = 'Empresas Por Regularidade';
            $scope.chart3.export = '';            
          }).$promise;


          // $scope.chart3 = {};
          $scope.chart4 = {};

          $scope.chart4.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
          $scope.chart4.data = [Math.random()*100, Math.random()*100, Math.random()*100];
          // $scope.chart4.name = 'Empresas Por Porte';
          $scope.chart4.export = '';

          // $scope.chart3.labels = ["Sales in month", "Sales in year", "Sales Total"];
          // $scope.chart3.dado = [Math.random()*100, Math.random()*100, Math.random()*100];
          // $scope.chart3.name = 'Empresas Por Regularidade';
          // $scope.chart3.export = '';
      }


      $q.all([rest1Response,rest2Response]).then(function(){
        if ($scope.request == 'atividades') {
          $scope.carregar.atividades = false;
        } else if ($scope.request == 'empresa'){
          $scope.carregar.empresas = false;
        }

        $scope.loading = false;
      });

    };
  
  });
