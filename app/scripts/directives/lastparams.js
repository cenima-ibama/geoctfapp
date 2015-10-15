'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:lastParams
 * @description
 * # lastParams
 */
angular.module('geoCtfApp')
  .directive('lastParams', function () {
    return {
      templateUrl: 'views/partials/lastparams.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	function defineScope(){
	      	scope.estados = attrs.ufs;
	      	scope.ano = attrs.year;
	      	scope.categorias = attrs.categories;
	      	scope.atividades = attrs.activities;
      	}
      	defineScope();
      }
    };
  });
