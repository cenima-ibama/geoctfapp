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
      controller: function($scope){
      	
      	/** 
      	* Function to get a geoJson object and return the properties of feature on param
      	* @param geoJsonObject.features
		* @return features.properties
		*/
		function returnFeatures(item){
			return item.properties;
		}

		Chart.defaults.global.colours = ['#337ab7', '#a94442', '#46BFBD', '#7B68EE', '#FDB45C', '#949FB1', '#4D5360'];

		$scope.options = {
			animationSteps: 5,
			bezierCurve : false,
			labelLength: 2,
			segmentStrokeWidth: 0.1,
		};

		// $on coming from estatisticas controller
		$scope.$on('drawchart1', function(event, dado){
			//Mapping data features to call returnFeatures and getting only properties
			dado = dado.features.map(returnFeatures); 

			var labels = [];
			var data = [];
			angular.forEach(dado, function(value){
				if(value.num_atividades !== 0){
					labels.push(value.sigla);
					data.push(value.num_atividades);
				}
			});


			$scope.chart1labels = labels; // Labels refer to X on charts
			$scope.chart1data = [data]; // Return data on array cos chartsjs lib needs
      		$scope.carregar.chart1 = false;
		});
      },
    };
  });
