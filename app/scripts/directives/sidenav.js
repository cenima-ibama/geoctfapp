'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('geoCtfApp')
  .directive('sidenav', function () {
    return {
      templateUrl: 'views/partials/sidenav.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //     event.preventDefault();
      // },
      controller: function($scope, $timeout, $mdSidenav, $mdUtil){

        function construirToggle(nav) {
          var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(nav)
                  .toggle();
              },300);
          return debounceFn;
        }

        $scope.selectCh = function(value){
          console.log(value.sigla);
        };

        $scope.toggleRight = construirToggle('right');
        
        $scope.close = function(){
          $mdSidenav('right').close();
        };

      },
    };
  });
