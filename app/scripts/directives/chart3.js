'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:chart3
 * @description
 * # chart3
 */
angular.module('geoCtfApp')
  .directive('chart3', function () {
    return {
      templateUrl: 'views/partials/chart3.html',
      restrict: 'E',
      controller: function($scope){
       
        $scope.$on('drawchart3', function(event, data){
          console.log(data);
        })

      }
    };
  });
