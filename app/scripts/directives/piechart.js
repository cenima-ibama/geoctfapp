'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('geoCtfApp')
  .directive('pieChart', function () {
    return {
      templateUrl: 'views/partials/pieChart.html',
      restrict: 'E',
      replace: true,
      scope: {
        pie: '=data'
      },
      link: function postLink(scope){

        function defineScope(val){
          if(val){
            scope.dado = val.dado;
            scope.labels = val.labels;
            scope.name = val.name;
          }
        }
        
        scope.$watch('pie', defineScope);

      }
    };
  });
