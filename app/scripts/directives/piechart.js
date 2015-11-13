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
      // replace: true,
      scope: {
        pie: '=data',
        name: '=',
        help: "=",
      },
      link: function postLink(scope){

        scope.options = {
          segmentShowStroke : true,
          segmentStrokeColor : "#fff",
          segmentStrokeWidth : 0,
          animationSteps : 10,
          animateScale : false,

          // legendTemplate : "<ul id=\"pieChart\" layout=\"column\" class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }
  
        function defineScope(val){
          if(val){
            if(!val.data[0]){
              scope.noData = true;
            }

            scope.data = val.data;
            scope.labels = val.labels;
            scope.export = val.export;
            
          }
        }
        
        scope.$watch('pie', defineScope);

      }
    };
  });
