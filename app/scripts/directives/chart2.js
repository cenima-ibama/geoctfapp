'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:chart2
 * @description
 * # chart2
 */
angular.module('geoCtfApp')
  .directive('chart2', function () {
    return {
      templateUrl: 'views/partials/chart2.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the chart2 directive');
      // }
      controller: function($scope){

        function getNameByParam (param, object){
          var retorno;
          angular.forEach(object, function(value, key){
            if(value.id == param){
              retorno = value;
            }
          });
          return retorno;
        }

        $scope.atividadeName = function(points, evt){
          $scope.legenda = getNameByParam(points[0].label, $scope.chart2atividades);
        };


      	$scope.$on('drawchart2', function(event, dado){
    			var labels = [];
          var data = [];
    			var legend = [];
    			
          angular.forEach(dado, function(value, key){
    				if(value.num_atividades !== 0){
              data.push(value.num_atividades);
              labels.push(value.id);
              legend.push({id: value.id, nome: value.nome});
    				}
    			});

          $scope.chart2atividades = legend;

          $scope.chart2labels = labels;
          $scope.chart2data = [data];
          $scope.carregar.chart2 = false;

      	});
      }
    };
  });
