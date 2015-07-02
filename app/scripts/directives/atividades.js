'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:atividades
 * @description
 * # atividades
 */
angular.module('geoCtfApp')
  .directive('atividades', function () {
    return {
      templateUrl: 'views/partials/atividades.html',
      restrict: 'E',
    };
  });
