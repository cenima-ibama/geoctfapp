'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:filter
 * @description
 * # filter
 */
angular.module('geoCtfApp')
  .directive('filter', function ($modal, $mdDialog) {
    return {
      templateUrl: 'views/partials/filter.html',
      restrict: 'E',
      controller: function($scope, containsObject, formData){
      	$scope.chart = {}; //Object to 'form' on view filter.html
      	$scope.es = []; //Initializing array to push values on function addValues below
      	$scope.ct = []; //Initializing array to push values on function addValues below
      	$scope.at = []; //Initializing array to push values on function addValues below

        $scope.changeStates = changeStates;
        $scope.addValues = addValues;

        function changeStates(region){
          var states = formData.estados;
          var statesFiltered = [];

          angular.forEach(states, function(value){
            if(value.regiao === region.nome){
              statesFiltered.push(value);
            }
          });

          if (region.nome !== 'Todas')
            statesFiltered.push({nome: 'Todos', regiao: 'Todos', sigla: 'Todos'});

          $scope.chart.estado = null;
          $scope.filterEstados = statesFiltered;
        }


      	function addValues(obj, type, param){

          $("[ctf-popover]").popover("hide");
          
          var states = formData.estados;

      		switch(type){
	      		case 'e':
	      			if(obj.nome == 'Todas'){
                  angular.forEach(states, function(value){
                    if(!containsObject($scope.es, value.sigla, 'sigla')){
                      $scope.es.push(value);
                    }
                  });
              } else if(!param || param.nome === 'Todos'){
                angular.forEach(states, function(value){
                  if(value.regiao === obj.nome){
                    if(!containsObject($scope.es, value.sigla, 'sigla')){
                      $scope.es.push(value);
                    }
                  }
                });
                $scope.chart.estado = $scope.chart.regiao = null;
              } else {
      					if(!containsObject($scope.es, param.sigla, 'sigla')){
      						$scope.es.push(param);
      					}
	      				$scope.chart.estado = $scope.chart.regiao = null;
	      			}
	      			break;
	      		default:
	      			if(!param || param.nome === 'Todos'){
	      				if(!containsObject($scope.ct, obj.id, 'id')){
	      					var categoria = {id: obj.id, nome: obj.nome};
	      					$scope.ct.push(categoria);
	      				}
	      				$scope.chart.categoria = $scope.chart.atividade = null;
	      			} else {
	      				if(!containsObject($scope.at, param.id, 'id')){
	      					param.categoria = obj.id;
	      					$scope.at.push(param);
	      				}
	      				$scope.chart.categoria = $scope.chart.atividade = null;
	      			}
          }
      	};
      }
    };
  });
