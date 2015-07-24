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
        getUser : function(aUser){
          if (user){
            return user.name;
          } else {
            return null;
          }
        },
        getToken : function(aUser){
          if (user){
            return user.token;
          } else {
            return null;
          }
        },
        isLoggedIn : function(){
          return (user) ? user : false;
        }
     };
  });
