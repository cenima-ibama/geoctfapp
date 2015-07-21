'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:chart4
 * @description
 * # chart4
 */
angular.module('geoCtfApp')
  .directive('chart4', function () {
    return {
      templateUrl: 'views/partials/chart4.html',
      restrict: 'E',
      controller: function($scope){

        $scope.$on('drawchart4', function(event, data){
          console.log(data);
        })

      }
    };
  });
