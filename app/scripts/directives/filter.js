'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:filter
 * @description
 * # filter
 */
angular.module('geoCtfApp')
  .directive('filter', function () {
    return {
      templateUrl: 'views/partials/filter.html',
      restrict: 'E',
      controller: function($scope, containsObject){
      	$scope.chart = {};
      	$scope.es = []; //Initializing objects to push on function beloew
      	$scope.ct = []; //Initializing objects to push on function beloew
      	$scope.at = []; //Initializing objects to push on function beloew

      	$scope.changeStates = function(region){
      		// if(!($scope.estados.length)){
      		// 	var states = angular.copy(service);
      		// }
      		var states = angular.copy($scope.estados);
      		var statesFiltered = [];

      		angular.forEach(states, function(value){
      			if(value.regiao == region.nome){
      				statesFiltered.push(value);
      			}
      		})

      		$scope.filterEstados = statesFiltered;
      	}

      	$scope.addValues = function(obj, type, param){
      		switch(type){
	      		case 'e':
	      			if(!param || param.nome === 'Todos'){
	      				angular.forEach($scope.estados, function(value){
	      					if(value.regiao === obj.nome){
		      					if(!containsObject($scope.es, value.sigla, 'sigla')){
		      						$scope.es.push(value);
		      					}
	      					}
	      				})
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
	      				if(!containsObject($scope.at, obj.id, 'id')){
	      					param.categoria = obj.id;
	      					$scope.at.push(param);
	      				}
	      				$scope.chart.categoria = $scope.chart.atividade = null;
	      			}
  			}
      	}

      }
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the filter directive');
      // }
    };
  });
