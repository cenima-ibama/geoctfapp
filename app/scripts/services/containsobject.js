'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.containsObject
 * @description
 * # containsObject
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .service('containsObject', function () {
  	return function containsObject(object, val, key){
		var r = 0;
		angular.forEach(object, function(value){
			if(value[key] === val){
				r++;
			}
		});

		if(r > 0){
			return true;
		} else{
			return false;
		}

	};
  });
