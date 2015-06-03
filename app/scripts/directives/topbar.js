'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:topbar
 * @description
 * # topbar
 */
angular.module('geoCtfApp')
  .directive('topbar', function () {
    return {
      templateUrl: 'views/partials/topbar.html',
      restrict: 'AE',
      controller: function(){
      },
    };
  });
