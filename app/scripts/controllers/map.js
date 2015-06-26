'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('MapCtrl', function ($scope, $rootScope, $cookies, $location, Auth, formData) {

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

      $scope.estados = formData.estados;
  });
