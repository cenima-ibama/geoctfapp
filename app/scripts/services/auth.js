'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.Auth
 * @description
 * # Auth
 * Factory in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('Auth', function () {
    var user;
      return{
        setUser : function(aUser){
        user = aUser;
      },
      isLoggedIn : function(){
        return(user)? user : false;
      }
    }
  });
