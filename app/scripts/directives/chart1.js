'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:chart1
 * @description
 * # chart1
 */
angular.module('geoCtfApp')
  .directive('chart1', function () {
    return {
      templateUrl: 'views/partials/chart1.html',
      // template: '<canvas  class='chart-bar chart-stats' data='chart1data' labels='chart1labels' legend='true' series='chart1series' options='options' flex></canvas>',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the chart1 directive');
      // }
      controller: function($scope){
		
		Chart.defaults.global.colours = ['#337ab7', '#a94442', '#46BFBD', '#7B68EE', '#FDB45C', '#949FB1', '#4D5360'];

		$scope.options = {
			animationSteps: 5,
			bezierCurve : false,
			labelLength: 2,
			segmentStrokeWidth: 0.1,
		};

		// $scope.chart1labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
		// $scope.chart1series = ['Series A', 'Series B'];
		// $scope.chart1data = [
		// 	[65, 59, 80, 81, 56, 55, 40],
		// 	[28, 48, 40, 19, 86, 27, 90]
		// ];

		$scope.$on('drawchart1', function(event, dado){
			var labels = [];
			var data = [];
			angular.forEach(dado, function(value, key){
				if(value.num_atividades !== 0){
					labels.push(value.sigla);
					data.push(value.num_atividades);
				}
			});

			$scope.chart1labels = labels;
			$scope.chart1data = [data];
      		$scope.carregar.chart1 = false;
		});
      },
    };
  });
