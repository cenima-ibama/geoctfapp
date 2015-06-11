'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('MapCtrl', function ($scope, $rootScope, $cookies, $location, Auth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.map = true;

    $cookies.SystemName = 'CTF-GEO';
    $rootScope.SystemName = $cookies.SystemName;


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
        { nome: 'Brasil', região: 'brasil', sigla: 'BR'},
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


  });
