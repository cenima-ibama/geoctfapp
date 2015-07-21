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
      controller: function($scope){
        
        /** 
        * Function to get name of atividade considering categoria and atividade received as param
        * That function will search name on each categoria then each atividade on object receveid
        * @param categoria
        * @param atividade
        * @param object
        * @return atividade name of categoria and atividade receveid 
        */
        function getNameByParam (categoria, atividade, object){
          var retorno;
          angular.forEach(object, function(value){
            if(value.id == categoria){
              angular.forEach(value.subcategorias, function(val){
                if(val.codigo == atividade){
                  retorno = categoria + '-' + atividade + ': ' + val.nome;
                }
              });
            }
          });
          return retorno;
        }

        /** 
        * Function to get name of selected point on chart and return name on scope var
        * @param points
        * @return {*} 
        */
        $scope.atividadeName = function(points){
          if(points.length){
            var param = points[0].label.split('-');
            var categoria = param[0];
            var atividade = param[1];

            if(categoria !== 'Outros'){
              $scope.chart2Legenda = getNameByParam(categoria, atividade, $scope.categorias);
            } else{
              $scope.chart2Legenda = 'Outros Valores';
            }
          } else{
            $scope.chart2Legenda = null;
          }
        };

        /** 
        * Function used on array,filter to return item when value isnt 0
        * @param points
        * @return {*} 
        */
        function numAtividades(item){
          return item.num_atividades !== 0;
        }

        $scope.$on('drawchart2', function(event, dado){

          if(!$scope.totalColumns || isNaN($scope.totalColumns)){ 
            $scope.totalColumns = 30; 
          }

          var columns = $scope.totalColumns;
    			var labels = [];
          var data = [];
    			var legend = [];
          var filtered = dado.filter(numAtividades); //Getting filtered value that isnt 0

          /*Sorting value to present asc*/
          filtered.sort(function(a,b) {
            return b.num_atividades - a.num_atividades;
          });

          /*Verifying if number of columns of data is more than selected on form*/
          if(filtered.length > columns){
            var outrasTotal = 0;

            for(var i=columns-1; i < filtered.length; i++){
              outrasTotal += filtered[i].num_atividades;
            }

            var outArray = [];
            for (i=0; i<columns; i++){
              outArray[i]= angular.copy(filtered[i]);
              if(i === columns-1){
                outArray[i] = {id: 'Outro', categoria: 'Outros', codigo: 'Outros', nome: 'Outros', num_atividades: outrasTotal};
              }
            }

            angular.forEach(outArray, function(value){
              labels.push(value.categoria + '-' + value.codigo);
              legend.push({id: value.id, codigo: value.categoria});
              data.push(value.num_atividades);            
            });

            $scope.chart2atividades = legend;
            $scope.chart2labels = labels;
            $scope.chart2data = [data];
          } else {
            angular.forEach(filtered, function(value){
              labels.push(value.categoria + '-' + value.codigo);
              legend.push({id: value.id, codigo: value.categoria});
              data.push(value.num_atividades);            
            });

            $scope.chart2atividades = legend;
            $scope.chart2labels = labels;
            $scope.chart2data = [data];
          }

          $scope.carregar.chart2 = false;

      	});
      }
    };
  });
