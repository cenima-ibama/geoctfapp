'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:topbar
 * @description
 * # topbar
 */
angular.module('geoCtfApp')
  .directive('topbar', function (appConfig, $location) {
    return {
      templateUrl: 'views/partials/topbar.html',
      restrict: 'AE',
      controller: function($rootScope){
     	
      	$rootScope.requestPDF = requestPDF;

      	function requestPDF(){
          // window.location.href = appConfig.guiaUrl;
		    	$location.path(appConfig.guiaUrl);
      	}

      },
    };
  });
