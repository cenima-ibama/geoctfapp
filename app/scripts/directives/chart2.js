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

          function numAtividades(item){
            return item.num_atividades !== 0;
          };

          if(!$scope.totalColumns || isNaN($scope.totalColumns)) $scope.totalColumns = 30;

          var columns = $scope.totalColumns;

    			var labels = [];
          var data = [];
    			var legend = [];
          var filtered = dado.filter(numAtividades);

          filtered.sort(function(a,b) {
            return b.num_atividades - a.num_atividades;
          });

          if(filtered.length > columns){
            var outrasTotal = 0;

            for(var i=columns-1; i < filtered.length; i++){
              outrasTotal += filtered[i].num_atividades;
            }

            var outArray = [];
            for (var i=0; i<columns; i++){
              outArray[i]= angular.copy(filtered[i]);
              if(i === columns-1)
                outArray[i] = {id: 'Outro', categoria: 'Outros', codigo: 'Outros', nome: 'Outros', num_atividades: outrasTotal};
            }

            angular.forEach(outArray, function(value){
              labels.push(value.categoria + '-' + value.codigo);
              legend.push({id: value.id, codigo: value.categoria});
              data.push(value.num_atividades);            
            })

            $scope.chart2atividades = legend;
            $scope.chart2labels = labels;
            $scope.chart2data = [data];
          } else {
            angular.forEach(filtered, function(value){
              labels.push(value.categoria + '-' + value.codigo);
              legend.push({id: value.id, codigo: value.categoria});
              data.push(value.num_atividades);            
            })

            $scope.chart2atividades = legend;
            $scope.chart2labels = labels;
            $scope.chart2data = [data];
          }

          $scope.carregar.chart2 = false;

      	});
      }
    };
  });
