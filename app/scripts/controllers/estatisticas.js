'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, RestApi, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.SystemName = $cookies.SystemName;
    $rootScope.map = false;

    function getYears(data){
      var d = new Date();
      var ano = d.getFullYear();
      var anos = [];
      while(data <= ano){
        anos.push(data);
        data++;
      }
      return anos;
    }

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


    $scope.estados = [
      { name: 'Brasil', regiao: 'brasil', sigla: 'BR'},
      { name: 'Acre', regiao: 'norte', sigla: 'AC'},
      { name: 'Amapá', regiao: 'norte', sigla: 'AP'},
      { name: 'Amazonas', regiao: 'norte', sigla: 'AM'},
      { name: 'Pará', regiao: 'norte', sigla: 'PA'},
      { name: 'Rondônia', regiao: 'norte', sigla: 'RO'},
      { name: 'Roraima', regiao: 'norte', sigla: 'RR'},
      { name: 'Tocantins', regiao: 'norte', sigla: 'TO'},
      { name: 'Alagoas', regiao: 'nordeste', sigla: 'AL'},
      { name: 'Bahia', regiao: 'nordeste', sigla: 'BA'},
      { name: 'Ceará', regiao: 'nordeste', sigla: 'CE'},
      { name: 'Maranhão', regiao: 'nordeste', sigla: 'MA'},
      { name: 'Paraíba', regiao: 'nordeste', sigla: 'PB'},
      { name: 'Pernambuco', regiao: 'nordeste', sigla: 'PE'},
      { name: 'Piauí', regiao: 'nordeste', sigla: 'PI'},
      { name: 'Rio Grande do Norte', regiao: 'nordeste', sigla: 'RN'},
      { name: 'Sergipe', regiao: 'nordeste', sigla: 'SE'},
      { name: 'Distrito Federal', regiao: 'centro', sigla: 'DF'},
      { name: 'Goiás', regiao: 'centro', sigla: 'GO'},
      { name: 'Mato Grosso', regiao: 'centro', sigla: 'MT'},
      { name: 'Mato Grosso do Sul', regiao: 'centro', sigla: 'MS'},
      { name: 'Espírito Santo', regiao: 'sudeste', sigla: 'ES'},
      { name: 'Minas Gerais', regiao: 'sudeste', sigla: 'MG'},
      { name: 'Rio de Janeiro', regiao: 'sudeste', sigla: 'RJ'},
      { name: 'São Paulo', regiao: 'sudeste', sigla: 'SP'},
      { name: 'Paraná', regiao: 'sul', sigla: 'PR'},
      { name: 'Rio grande do Sul', regiao: 'sul', sigla: 'RS'},
      { name: 'Santa Catarina', regiao: 'sul', sigla: 'SC'},
    ];

    var years = getYears(1988);
    years.push('Todos');

    $scope.anos = years.reverse();
    $scope.chart = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
      $scope.categorias.push({id: 'Todos' , nome: 'Todos'});
    });

    $scope.listCity = function(categoria){
      $scope.chart.subCategoria = '';
      if(categoria.id != 'Todos'){
        $scope.subCategorias = categoria.subcategoria_set;
        $scope.subCategorias.push({id: 'Todos' , nome: 'Todos'});
      }
    };

    $scope.carregar = {}

    $scope.request = function(form){

      $scope.carregar.chart1 = true;

      var subchart1 = '';
      var subchart2 = '';

      if(form.ano != 'Todos'){
        if(form.ano){
          subchart1 = subchart1 + '&ano=' + form.ano;
          subchart2 = subchart2 + '&ano=' + form.ano;
        }
      }
      
      if(form.estado)
        subchart2 = subchart2 + '&uf=' + form.estado.sigla;

      if(form.categoria){
        if(form.categoria.nome != 'Todos'){
          subchart1 = subchart1 + '&categoria=' + form.categoria.id;
          // subchart2 = subchart2 + '&categoria=' + form.categoria.id;
        }
      }
      
      if(form.subCategoria){
        if(form.subCategoria.nome != 'Todos'){
          subchart1 = subchart1 + '&subcategoria=' + form.subCategoria.id;
          // subchart2 = subchart2 + '&subcategoria=' + form.subCategoria.id;
        }
      }

      $rootScope.chart1series = [form.ano];

      $log.debug('chart1 = estatistica-uf/?' + subchart1);
      $log.debug('chart2 = estatistica-categoria/?' + subchart2);

      if(form.estado){
        $scope.carregar.chart2 = true;
        $rootScope.chart2series = [form.estado.name];
        // $rootScope.chart2labels = [form.estado.name];
        RestApi.get({type: 'estatistica-categoria', subtype: subchart2}, function(data){
          $scope.$broadcast('drawchart2', data);
        });
      }

      RestApi.get({type: 'estatistica-uf', subtype: subchart1}, function(data){
        $scope.$broadcast('drawchart1', data);
      });      

    };



  });
