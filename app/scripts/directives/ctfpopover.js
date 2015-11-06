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
                    html: true,
	                trigger: attrs.popoverTrigger ? attrs.popoverTrigger : 'hover',
	                content: attrs.popoverContent ? attrs.popoverContent : 'Popover Content',
	                placement: attrs.popoverPlacement ? attrs.popoverPlacement : 'bottom',
	                container: attrs.popoverContainer ? attrs.popoverContainer : el.prev(),
                    delay: attrs.popoverDelay ? {"show": 0, "hide": 0} : {"show": 1800, "hide" : 300},
	            });

            	if(attrs.popoverShow){
        			$(el).popover('show');
            	}
            })
        }
    };
  });
  
