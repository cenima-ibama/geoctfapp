'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:linkbar
 * @description
 * # linkbar
 */
angular.module('geoCtfApp')
  .directive('linkbar', function () {
    return {
      templateUrl: 'views/partials/linkbar.html',
      restrict: 'E',
    };
  });
