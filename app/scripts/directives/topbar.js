'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:topbar
 * @description
 * # topbar
 */
angular.module('geoCtfApp')
  .directive('topbar', function (appConfig) {
    return {
      templateUrl: 'views/partials/topbar.html',
      restrict: 'AE',
      controller: function($rootScope){
     	
      	function requestPDF(){
          window.open(appConfig.guiaUrl, '_blank');
      	}

        $rootScope.requestPDF = requestPDF;

      },
    };
  });
