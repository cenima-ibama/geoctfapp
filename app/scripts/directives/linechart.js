'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:lineChart
 * @description
 * # lineChart
 */
angular.module('geoCtfApp')
  .directive('lineChart', function () {
    return {
      templateUrl: 'views/partials/lineChart.html',
      restrict: 'E',
      scope: {
        help: "=",
      	bar: '=data',
      	info: '=',
      	name: '=',
      },
      link: function postLink(scope, element, attrs) {

    		scope.options = {
    			animationSteps: 2,
    			bezierCurve : false,
    		};

            scope.$watch('bar', defineScope);

	     	Chart.defaults.global.colours = ['#337ab7', '#a94442', '#46BFBD', '#7B68EE', '#FDB45C', '#949FB1', '#4D5360'];

            function noMax(object){
    	        var param = {};
          		scope.data = [object.data[0]];
              scope.labels = object.labels;
              scope.series = object.series;
            }

            function defineScope(data){
    			if(data){
    				noMax(data);
    				scope.export = data.export;
    				scope.description = data.description;
    			}
        }
      }
    };
  });
