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
        { name: 'Brasil', região: 'brasil', sigla: 'BR'},
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


  });
