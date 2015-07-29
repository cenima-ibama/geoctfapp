'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('geoCtfApp')
  .directive('pieChart', function () {
    return {
      templateUrl: 'views/partials/pieChart.html',
      restrict: 'E',
      replace: true,
      scope: {
        pie: '=data',
        name: '=',
      },
      link: function postLink(scope){

        scope.options = {
          segmentShowStroke : true,
          segmentStrokeColor : "#fff",
          segmentStrokeWidth : 0,
          animationSteps : 50,
          animateScale : false,
          // legendTemplate : "<ul id=\"pieChart\" layout=\"column\" class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      }

        function defineScope(val){
          if(val){
            scope.data = val.data;
            scope.labels = val.labels;
            scope.export = val.export;

            // var dd = angular.element(document.getElementsByClassName('chart-container'));
            // dd.attr('layout', 'row');
            // dd.attr('resize');

            // var de = angular.element(document.getElementsByClassName('chart-legend'));
            // de.attr('layout', 'column');

          }
        }
        
        scope.$watch('pie', defineScope);

      }
    };
  });
