'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('geoCtfApp')
  .directive('sidenav', function (RestApi) {
    return {
      templateUrl: 'views/partials/sidenav.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //     event.preventDefault();
      // },
      controller: function($scope, $timeout, $mdSidenav, $mdUtil){

        $scope.filter = {};
        $scope.listMunicipios = false;

        $scope.requestFilter = function(value){
          console.log(value);
        }

        $scope.selectCh = function(value){
          $scope.municipios = '';
          $scope.filter.municipio = '';
          RestApi.getMunicipios({type: 'estado', estado: value.sigla}, function(data){
            $scope.listMunicipios = true;
            $scope.municipios = data.municipio_set;
          })
        };

        function construirToggle(nav) {
          var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(nav)
                  .toggle();
              },300);
          return debounceFn;
        }

        $scope.toggleRight = construirToggle('right');
        
        $scope.close = function(){
          $mdSidenav('right').close();
        };

      },
    };
  });
