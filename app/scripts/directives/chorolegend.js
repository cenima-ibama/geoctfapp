'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:chorolegend
 * @description
 * # chorolegend
 */
angular.module('geoCtfApp')
  .directive('choroLegend', function () {

    //Quantidade padrão de itens listados na legenda
    var DEFAULT_STEP_COUNT = 4;

    return {
      templateUrl: 'views/partials/chorolegend.html',
      restrict: 'E',
      scope : {
        choroData : '=data',
        stepCount : '='
      },
      link: postLink
    };

    /**
     * Ouvinte da criação dos elementos gráficos.
     * @param {Scope} scope
     */
    function postLink(scope) {

      scope.$watch('choroData', onDataChanged);

      /**
       * Ouvinte do evento de alteração da propriedade <code>values</code> do <code>scope</code>.
       * @param value
       */
      function onDataChanged (choroData) {

        var steps = [],
          stepCount = Number(scope.stepCount) || DEFAULT_STEP_COUNT,
          stepPartPercent,
          stepPart,
          values,
          index = 1,
          value,
          min,
          max,
          step;

        if (choroData && choroData.features.length >= 2) {

          values = choroData.features.map(function (value) {return value.properties.num_atividades});

          stepPartPercent = Math.round(100/stepCount);
          stepPart = (1/stepCount).toFixed(2);

          min = Math.min.apply(null, values);
          max = Math.max.apply(null, values);

          steps.push({value : min, position : 0});

          while(index <= stepCount-1) {

            value = getValueByPercent(min, max, stepPart*index);

            step = {
              value : value,
              position : stepPartPercent*index
            };

            steps.push(step);

            index++;
          }

          steps.push({value : max, position : 100});
          scope.items = steps;

        } else

          scope.items = [];
      }
    }

    /**
     * Retorna a posição em porcentagem de <code>value</code> relativo a extensão entre <code>min</code>
     * e <code>max</code>.
     * @param {Number} min Valor mínimo
     * @param {Number} max Valor máximo
     * @param {Number} value
     * @returns {number}
     */
    function getValueByPercent (min, max, percent) {

      if(percent > 1 || percent < 0)

        throw new Error('Percent param must be between 0 and 100');

      var maxDif = max - min;

      return Math.round((maxDif*percent) + min);
    }

  }
);
