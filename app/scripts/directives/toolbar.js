'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:toolbar
 * @description
 * # toolbar
 */
angular.module('geoCtfApp')
  .directive('toolbar', function () {
    return {
      templateUrl: 'views/partials/toolbar.html',
      restrict: 'E',
//      link: function postLink(scope, element, attrs) {
  //      element.text('this is the toolbar directive');
    //  }
    };
  });
