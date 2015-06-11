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
      { nome: 'Brasil', regiao: 'brasil', sigla: 'BR', value: 'Todos'},
      { nome: 'Acre', regiao: 'norte', sigla: 'AC'},
      { nome: 'Amapá', regiao: 'norte', sigla: 'AP'},
      { nome: 'Amazonas', regiao: 'norte', sigla: 'AM'},
      { nome: 'Pará', regiao: 'norte', sigla: 'PA'},
      { nome: 'Rondônia', regiao: 'norte', sigla: 'RO'},
      { nome: 'Roraima', regiao: 'norte', sigla: 'RR'},
      { nome: 'Tocantins', regiao: 'norte', sigla: 'TO'},
      { nome: 'Alagoas', regiao: 'nordeste', sigla: 'AL'},
      { nome: 'Bahia', regiao: 'nordeste', sigla: 'BA'},
      { nome: 'Ceará', regiao: 'nordeste', sigla: 'CE'},
      { nome: 'Maranhão', regiao: 'nordeste', sigla: 'MA'},
      { nome: 'Paraíba', regiao: 'nordeste', sigla: 'PB'},
      { nome: 'Pernambuco', regiao: 'nordeste', sigla: 'PE'},
      { nome: 'Piauí', regiao: 'nordeste', sigla: 'PI'},
      { nome: 'Rio Grande do Norte', regiao: 'nordeste', sigla: 'RN'},
      { nome: 'Sergipe', regiao: 'nordeste', sigla: 'SE'},
      { nome: 'Distrito Federal', regiao: 'centro', sigla: 'DF'},
      { nome: 'Goiás', regiao: 'centro', sigla: 'GO'},
      { nome: 'Mato Grosso', regiao: 'centro', sigla: 'MT'},
      { nome: 'Mato Grosso do Sul', regiao: 'centro', sigla: 'MS'},
      { nome: 'Espírito Santo', regiao: 'sudeste', sigla: 'ES'},
      { nome: 'Minas Gerais', regiao: 'sudeste', sigla: 'MG'},
      { nome: 'Rio de Janeiro', regiao: 'sudeste', sigla: 'RJ'},
      { nome: 'São Paulo', regiao: 'sudeste', sigla: 'SP'},
      { nome: 'Paraná', regiao: 'sul', sigla: 'PR'},
      { nome: 'Rio grande do Sul', regiao: 'sul', sigla: 'RS'},
      { nome: 'Santa Catarina', regiao: 'sul', sigla: 'SC'},
    ];

    var years = getYears(1988);
    years.push('Todos');

    $scope.anos = years.reverse();
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
