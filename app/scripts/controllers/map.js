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

    $scope.tabMap = true;

    $cookies.SystemName = 'CTF-GEO';
    $rootScope.SystemName = $cookies.SystemName;

    if ($cookies.get('dataUser')) {
      // $rootScope.dataUser = JSON.parse($cookies.get('dataUser'));
      Auth.setUser(JSON.parse($cookies.get('dataUser')));
      $rootScope.dataUser = {};
      $rootScope.dataUser.userName = Auth.getUser();
    }

    $rootScope.logged = Auth.isLoggedIn() ? true : false;

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
  });
