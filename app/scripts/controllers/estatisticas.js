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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tabStats = true;

    $scope.chart4 = {};

  $scope.chart3labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.chart3series = ['Series A', 'Series B'];
  $scope.chart3data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
      if(!value && oldValue) {
        console.log('Disconnect');
        $location.path('#/');
      }
      if(value) {
        console.log('Connect');
       //Do something when the user is connected
      }
    }, true);

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
          // $scope.export.chart1 = appConfig.apiUrl + '/estatistica-uf/?format=csv&uf=' + arrEstado + '&categoria' + arrCategoria + '&subcategoria=' +arrSubcategoria;
          // $scope.export.chart2 = appConfig.apiUrl + '/estatistica-subcategoria/?format=csv&uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria;

          // $log.debug('chart1 = ' + $scope.export.chart1 );
          // $log.debug('chart2 = ' + $scope.export.chart2 );

          // RestApi.get({type: 'estatistica-subcategoria', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
          //   $scope.$broadcast('drawchart2', data);
          // });

          // RestApi.getObject({type: 'geoestatistica-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
          //   $scope.$broadcast('drawchoro', data);
          //   $scope.$broadcast('drawchart1', data);
          // });

 
          // $scope.chart4.dado = ["Sales", "Caio", "teste Sales"];
          // $scope.chart4.labels = [3, 51, 12];


          $scope.carregar.chart1 = false;
          $scope.carregar.chart2 = false;
          $scope.carregar.choro = false;

          console.log($scope.chart3);
      }




    };
  
  });
