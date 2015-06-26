'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, RestApi, $log, formData) {


    $cookies.SystemName = 'CTF-GEO';
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


    $scope.estados = formData.estados;

    $scope.anos = formData.anos;
    $scope.chart = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
      $scope.categorias.push({id: 'Todos' , nome: 'Todos'});
    });

    $scope.listSubcategoria = function(categoria){
      $scope.chart.subCategoria = '';
      if(categoria.id !== 'Todos'){
        $scope.subCategorias = categoria.subcategorias;
        $scope.subCategorias.push({id: 'Todos' , nome: 'Todos'});
      }
    };

    $scope.carregar = {};

    $scope.request = function(form){

      $scope.legenda = null;
      $scope.chart2atividades = null;

      $scope.carregar.chart1 = true;
      $scope.carregar.chart2 = true;

      var subchart1 = '';
      var subchart2 = '';

      if(form.ano !== 'Todos'){
        if(form.ano){
          subchart1 = subchart1 + '&ano=' + form.ano;
          subchart2 = subchart2 + '&ano=' + form.ano;
        }
      }
      
      if(form.categoria){
        if(form.categoria.nome !== 'Todos'){
          subchart1 = subchart1 + '&categoria=' + form.categoria.id;
        }
      }
      
      if(form.subCategoria){
        if(form.subCategoria.nome !== 'Todos'){
          subchart1 = subchart1 + '&subcategoria=' + form.subCategoria.id;
        }
      }
      
      if(form.estado){
        if(form.estado.nome !== 'Brasil'){
          subchart2 = subchart2 + '&uf=' + form.estado.sigla;
          $rootScope.chart2series = [form.estado.nome];
        } else {
          $rootScope.chart2series = ['Brasil'];
        }
      } else if(!form.estado){
          $rootScope.chart2series = ['Brasil'];
      }
      
      $rootScope.chart1series = [form.ano];

      //Print var on debug
      $log.debug('chart1 = estatistica-uf/?' + subchart1);
      $log.debug('chart2 = estatistica-categoria/?' + subchart2);

      // Requests para a aplicação com posterior envio aos escopos das diretivas
      RestApi.get({type: 'estatistica-categoria', subtype: subchart2}, function(data){
        $scope.$broadcast('drawchart2', data);
      });

      RestApi.get({type: 'estatistica-uf', subtype: subchart1}, function(data){
        $scope.$broadcast('drawchart1', data);
      });      

    };



  });
