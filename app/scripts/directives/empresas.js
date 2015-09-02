'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:empresas
 * @description
 * # empresas
 */
angular.module('geoCtfApp')
  .directive('empresas', function () {
    return {
      templateUrl: 'views/partials/empresas.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
