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

    $scope.regioes = [ 
      { nome: 'Centro-Oeste'}, 
      { nome: 'Norte'},
      { nome: 'Nordeste'}, 
      { nome: 'Sul'},
      { nome: 'Sudeste'} 
    ]

    $scope.estados = formData.estados;
    $scope.anos = formData.anos;

    var years = getYears(1988);
    years.push('Todos');

    $scope.anos = years.reverse();
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

    $scope.solicitar = function(estados, categorias, atividades){


      $scope.carregar.chart1 = true;
      $scope.carregar.chart2 = true;
    
      var arrEstado = '';
      var arrCategoria = '';
      var arrSubcategoria = '';

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

      RestApi.get({type: 'estatistica-uf', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria}, function(data){
        $scope.$broadcast('drawchart1', data);
      });

      RestApi.get({type: 'estatistica-subcategoria', uf: arrEstado, categoria: arrCategoria, subcategoria: arrSubcategoria}, function(data){
        $scope.$broadcast('drawchart2', data);
      });

      // console.log(arrEstado);
      // console.log(arrSubcategoria);
      // console.log(arrCategoria);

    }

    // $scope.request = function(form){

    //   $scope.legenda = null;
    //   $scope.chart2atividades = null;

    //   $scope.carregar.chart1 = true;
    //   $scope.carregar.chart2 = true;

    //   var subchart1 = '';
    //   var subchart2 = '';

    //   if(form.ano !== 'Todos'){
    //     if(form.ano){
    //       subchart1 = subchart1 + '&ano=' + form.ano;
    //       subchart2 = subchart2 + '&ano=' + form.ano;
    //     }
    //   }
      
    //   if(form.categoria){
    //     if(form.categoria.nome !== 'Todos'){
    //       subchart1 = subchart1 + '&categoria=' + form.categoria.id;
    //     }
    //   }
      
    //   if(form.subCategoria){
    //     if(form.subCategoria.nome !== 'Todos'){
    //       subchart1 = subchart1 + '&subcategoria=' + form.subCategoria.id;
    //     }
    //   }
      
    //   if(form.estado){
    //     if(form.estado.nome !== 'Brasil'){
    //       subchart2 = subchart2 + '&uf=' + form.estado.sigla;
    //       $rootScope.chart2series = [form.estado.nome];
    //     } else {
    //       $rootScope.chart2series = ['Brasil'];
    //     }
    //   } else if(!form.estado){
    //       $rootScope.chart2series = ['Brasil'];
    //   }
      
    //   $rootScope.chart1series = [form.ano];

    //   //Print var on debug
    //   $log.debug('chart1 = estatistica-uf/?' + subchart1);
    //   $log.debug('chart2 = estatistica-categoria/?' + subchart2);

    //   // Requests para a aplicação com posterior envio aos escopos das diretivas
    //   RestApi.get({type: 'estatistica-categoria', subtype: subchart2}, function(data){
    //     $scope.$broadcast('drawchart2', data);
    //   });

    //   RestApi.get({type: 'estatistica-uf', subtype: subchart1}, function(data){
    //     $scope.$broadcast('drawchart1', data);
    //   });      

    // };



  });
