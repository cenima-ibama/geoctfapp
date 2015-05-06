'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:topBar
 * @description
 * # topBar
 */
angular.module('geoCtfApp')
  .directive('topBar', function () {
    return {
      // template: '<div></div>',
      templateUrl: 'views/topbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the topBar directive');
      }
    };
  });
