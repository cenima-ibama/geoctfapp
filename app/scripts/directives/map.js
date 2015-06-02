'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:map
 * @description
 * # map
 */
angular.module('geoCtfApp')
  .directive('map', function () {
    return {
      template: '<div resizable ng-style="{height: windowHeight-50}" id="map"><sidenav></sidenav></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.map = L.map('map').setView([-12, -52], 5);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'//,
        }).addTo(scope.map);
      }
    };
  });
