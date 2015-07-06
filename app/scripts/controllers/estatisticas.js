'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, RestApi, $log, containsObject, formData) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $cookies.SystemName = 'CTF-APP-GEO';
    $rootScope.SystemName = $cookies.SystemName;
    
    $rootScope.map = false;

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

    $scope.regioes = formData.regioes;

    $scope.estados = formData.estados;
    $scope.anos = formData.anos;

    $scope.chart = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
      if(!(containsObject($scope.categorias, 'Todos', 'id'))){
        $scope.categorias.push({id: 'Todos' , nome: 'Todos'});
      }

      $scope.codigoCategoria = [];
      angular.forEach($scope.categorias, function(value, key){
        $scope.codigoCategoria.push(value.id);
      })
    });


    $scope.listSubcategoria = function(categoria){
      $scope.chart.subCategoria = '';
      if(categoria.id !== 'Todos'){
        $scope.atividades = categoria.subcategorias;
        if(!(containsObject($scope.atividades, 'Todos', 'id'))){
          $scope.atividades.push({codigo: 'Todos', id:'Todos', nome: 'Todos'});
        }
      }
    };

    $scope.carregar = {};

    $scope.solicitar = function(estados, categorias, atividades, ano){

      $scope.carregar.chart1 = true;
      $scope.carregar.chart2 = true;
    
      var arrEstado = '';
      var arrCategoria = '';
      var arrSubcategoria = '';
      var arrAno;

      if(!ano || ano == 'Todos')
        arrAno = '';
      else
        arrAno = ano;

      angular.forEach(estados, function(value, key){
        arrEstado += value.sigla + ',';
      })
      angular.forEach(atividades, function(value, key){
        arrSubcategoria += value.id + ',';
      })
      angular.forEach(categorias, function(value, key){
        arrCategoria += value.id + ',';
      })

      arrEstado = arrEstado.substring(0,(arrEstado.length - 1));
      arrCategoria = arrCategoria.substring(0,(arrCategoria.length - 1));
      arrSubcategoria = arrSubcategoria.substring(0,(arrSubcategoria.length - 1));


      $log.debug('chart1 = estatistica-uf/?uf=' + arrEstado + '&categoria' + arrCategoria + '&subcategoria=' +arrSubcategoria );
      $log.debug('chart2 = estatistica-subcategoria/?uf=' + arrEstado + '&categoria=' + arrCategoria + '&subcategoria=' + arrSubcategoria);

      RestApi.get({type: 'estatistica-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
        $scope.$broadcast('drawchart1', data);
      });

      RestApi.get({type: 'estatistica-subcategoria', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria, ano: arrAno}, function(data){
        $scope.$broadcast('drawchart2', data);
      });
    }

  
  });
