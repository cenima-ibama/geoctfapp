'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:ctfPopover
 * @description
 * # ctfPopover
 */
angular.module('geoCtfApp')
  .directive('ctfPopover', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            $timeout(function(){

	            $(el).popover({
	                trigger: attrs.popoverTrigger ? attrs.popoverTrigger : 'hover',
	                html: true,
	                content: attrs.popoverContent ? attrs.popoverContent : 'Popover Content',
	                placement: attrs.popoverPlacement ? attrs.popoverPlacement : 'bottom',
	                container: attrs.popoverContainer 
	            });
            	
            	if(attrs.popoverShow){
        			$(el).popover('show');
            	}
            })
        }
    };
  });
