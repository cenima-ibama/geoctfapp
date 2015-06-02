'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('MapCtrl', function ($scope, $rootScope, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.map = true;

    $cookies.SystemName = 'CTF-GEO';
    $rootScope.SystemName = $cookies.SystemName;

  });
