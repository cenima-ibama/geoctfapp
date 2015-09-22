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
      	bar: '=data',
      	info: '=',
      	name: '=',
      },
      link: function postLink(scope, element, attrs) {

		scope.options = {
			animationSteps: 2,
			bezierCurve : false,
			responsive: true,
		};

		Chart.defaults.global.colours = ['#337ab7', '#a94442', '#46BFBD', '#7B68EE', '#FDB45C', '#949FB1', '#4D5360'];

		// function showFewerColumns(param) {

		// 	var data = param.data;
		// 	var labels = param.labels;

	 //        if ((labels.length < 5) && (data.length < 5)) {
	 //        	var filling = 5 - labels.length;

	 //        	var leftfilling = Array.apply(null, Array(parseInt(filling/2))).map(Number.prototype.valueOf,0);
	 //        	var rightfilling = Array.apply(null, Array(parseInt(filling/2))).map(Number.prototype.valueOf,0);

	 //        	param.data = leftfilling.map(function(){return ""}).concat(data).concat(rightfilling.map(function(){return ""}));
	 //        	param.labels = leftfilling.map(function(){return ""}).concat(labels).concat(rightfilling.map(function(){return ""}));
	 //        }

		// }

        function noMax(object){
	        var param = {};
	        param.data = object.data[0];
	        param.labels = object.labels;

	        // showFewerColumns(param);

    		scope.data = [param.data];
            scope.labels = param.labels;
            scope.series = object.series;
        }


        function defineScope(data){
			if(data){
				noMax(data);
				scope.export = data.export;
				scope.describe = data.describe;
			}
        }

        scope.$watch('bar', defineScope);








      }
    };
  });
