'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth, $location, RestApi) {
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
      return anos.reverse();
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
      { name: 'Brasília', regiao: 'centro', sigla: 'DF'},
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

    $scope.anos = getYears(1988);
    $scope.chart = {};

    RestApi.get({ type: 'categorias'}, function(data){
      $scope.categorias = data;
    });

    $scope.listCity = function(categoria){
      $scope.chart.subCategoria = '';
      $scope.subCategorias = categoria.subcategoria_set;
      $scope.subCategorias.push({id: 'Todos' , nome: 'Todos'});
    };

    $scope.carregar = {}

    $scope.request = function(form){
      $scope.carregar.chart1 = true;
      var sub = '';
      console.log(form);

      if(form.ano)
        sub = sub + '&ano=' + form.ano;
      if(form.estado)
        sub = sub + '&uf=' + form.estado;
      if(form.categoria)
        sub = sub + '&categoria=' + form.categoria.id;
      if(form.subCategoria){
        if(form.subCategoria.nome != 'Todos')
        sub = sub + '&subcategoria=' + form.subCategoria.id;
      }

      $scope.chart1series = [form.ano];

      RestApi.get({type: 'estatistica-uf', subtype: sub}, function(data){
        $scope.$broadcast('drawchart1', data);
      })
    };



  });
