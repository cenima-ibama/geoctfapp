'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:resizable
 * @description
 * # resizable
 */
angular.module('geoCtfApp')
 .directive('resizable', function($window) {
    return function($scope) {
      $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        $scope.windowWidth = $window.innerWidth;
        // return $scope.windowWidth;
      };
      $scope.initializeWindowSize();
      angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
        $scope.$apply();
      });
    };
});
