'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('MapCtrl', function ($scope, $rootScope, $cookies, $location, Auth, formData, $log) {

    $scope.tabMap = true;

    if ($cookies.get('dataUser')) {
      Auth.setUser(JSON.parse($cookies.get('dataUser')));
      $rootScope.dataUser = {};
      $rootScope.dataUser.userName = Auth.getUser();
    }

    $rootScope.logged = Auth.isLoggedIn() ? true : false;

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
      if(!value && oldValue) {
        $log.info('User Disconnected');
        $location.path('#/');
      }

      if(value) {
        $log.info('User Connected');
        Auth.setUser(JSON.parse($cookies.get('dataUser')));
        $rootScope.dataUser = {};
        $rootScope.dataUser.userName = Auth.getUser();
        //Do something when the user is connected
      }

    }, true);

      $scope.estados = formData.estados;
      $scope.anos = formData.anos;
  });
