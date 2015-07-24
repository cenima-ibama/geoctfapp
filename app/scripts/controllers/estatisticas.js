'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, RestApi, $log, containsObject, formData, appConfig) {

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

    $scope.carregar = {};
    $scope.export = {};
    $scope.chart = {};

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
    };


    $scope.solicitar = function(estados, categorias, atividades, ano){

      //Reseting chart2 legend
      $scope.chart2Legenda = null;

      $scope.carregar.chart1 = true;
      $scope.carregar.chart2 = true;
      $scope.carregar.choro = true;
    
      var arrEstado = '';
      var arrCategoria = '';
      var arrSubcategoria = '';
      var arrAno;

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


      switch($scope.request){
        case 'atividades':
          $scope.export.chart1 = appConfig.apiUrl + '/estatistica-uf/?format=csv&uf=' + arrEstado + '&categoria' + arrCategoria + '&subcategoria=' +arrSubcategoria;
          $scope.export.chart2 = appConfig.apiUrl + '/estatistica-subcategoria/?format=csv&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;

          $log.debug('chart1 = ' + $scope.export.chart1 );
          $log.debug('chart2 = ' + $scope.export.chart2 );

          RestApi.get({type: 'estatistica-subcategoria', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.$broadcast('drawchart2', data);
          });

          RestApi.getObject({type: 'geoestatistica-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
            $scope.$broadcast('drawchoro', data);
            $scope.$broadcast('drawchart1', data);
          });
          break;
        default:
          $scope.chart3 = {};
          $scope.chart4 = {};

          $scope.chart4.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
          $scope.chart4.dado = [Math.random()*100, Math.random()*100, Math.random()*100];
          $scope.chart4.name = 'Empresas Por Porte';

          $scope.chart3.labels = ["Sales in month", "Sales in year", "Sales Total"];
          $scope.chart3.dado = [Math.random()*100, Math.random()*100, Math.random()*100];
          $scope.chart3.name = 'Empresas Por Regularidade';


          $scope.carregar.chart1 = false;
          $scope.carregar.chart2 = false;
          $scope.carregar.choro = false;

          console.log("Is on a new Request (See switch)");
      }




    };
  
  });
