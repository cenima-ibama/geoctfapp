'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:barChart
 * @description
 * # barChart
 */
angular.module('geoCtfApp')
  .directive('barChart', function () {
    return {
      templateUrl: 'views/partials/barChart.html',
      // template: '<div></div>',
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
		};

		Chart.defaults.global.colours = ['#337ab7', '#a94442', '#46BFBD', '#7B68EE', '#FDB45C', '#949FB1', '#4D5360'];

		function showFewerColumns(param) {

			var data = param.data;
			var labels = param.labels;

	        if ((labels.length < 5) && (data.length < 5)) {
	        	var filling = 5 - labels.length;

	        	var leftfilling = Array.apply(null, Array(parseInt(filling/2))).map(Number.prototype.valueOf,0);
	        	var rightfilling = Array.apply(null, Array(parseInt(filling/2))).map(Number.prototype.valueOf,0);

	        	param.data = leftfilling.map(function(){return ""}).concat(data).concat(rightfilling.map(function(){return ""}));
	        	param.labels = leftfilling.map(function(){return ""}).concat(labels).concat(rightfilling.map(function(){return ""}));
	        }

		}

        function maxBar(object){
	        
	        /** 
	        * Function to get name of selected point on chart and return name on scope var
	        * @param points
	        * @return {*} 
	        */
	        scope.atividadeName = function(points){
	        	if(points.length){
		            var param = points[0].label.split('-');
		            var categoria = param[0];
		            var atividade = param[1];

		            if(categoria !== 'Outros'){
		              scope.legend = getNameByParam(categoria, atividade, object.categorias);
		            } else{
		              scope.legend = 'Demais Atividades';
		            }
		        } else{
		            scope.legend = null;
	         	}
	        }

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
			* Function used on array,filter to return item when value isnt 0
			* @param points
			* @return {*} 
			*/
			function numAtividades(item){
				return item.num_atividades !== 0;
			}


        	if(!object.totalColumns || isNaN(object.totalColumns)){ 
            	object.totalColumns = 30; 
        	}

        	var columns = object.totalColumns;
			var labels = [];
          	var data = [];
    		var legend = [];
          	var filtered = object.data.filter(numAtividades); //Getting filtered value that isnt 0

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
	            	// legend.push({id: value.id, codigo: value.categoria});
	            	data.push(value.num_atividades);            
	            });

	            // $scope.chart2atividades = legend;
          	} else {
	            angular.forEach(filtered, function(value){
	              labels.push(value.categoria + '-' + value.codigo);
	              // legend.push({id: value.id, codigo: value.categoria});
	              data.push(value.num_atividades);            
	            });

	            // $scope.chart2atividades = legend;
	        }

	        var param = {};
	        param.data = data;
	        param.labels = labels;

	        showFewerColumns(param);

            scope.labels = param.labels;
            scope.data = [param.data];
        }


        function noMax(object){
	        var param = {};
	        param.data = object.data[0];
	        param.labels = object.labels;

	        showFewerColumns(param);

    		scope.data = [param.data];
            scope.labels = param.labels;
            scope.series = object.series;
        }


        function defineScope(data){
          if(data){
          	if(scope.info){
          		maxBar(data);
          		scope.export = data.export;
          		scope.describe = data.describe;
          	} else{
          		noMax(data);
          		scope.export = data.export;
          		scope.describe = data.describe;
          	}
          }
        }

        scope.$watch('bar', defineScope);


      }
    };
  });
