'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:inscricoes
 * @description
 * # inscricoes
 */
angular.module('geoCtfApp')
  .directive('inscricoes', function () {
    return {
      templateUrl: 'views/partials/inscricoes.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
    };
  });
