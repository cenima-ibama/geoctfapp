'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:login
 * @description
 * # login
 */
angular.module('geoCtfApp')
  .directive('login', function ($log, $http, Auth) {
    return {
      templateUrl: 'views/partials/login.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      // },
      controller: function($scope, RestApi, $rootScope){
      	
        $rootScope.logout = function(){
          $rootScope.dataUser = null;
          $rootScope.logged = false;
          Auth.setUser(false, false);
        };


      	$scope.acessar = function(obj){

          $scope.login = {};
          $scope.login.carregar = false;

          function base64_encode(data) {
            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
              ac = 0,
              enc = '',
              tmp_arr = [];

            if (!data) {
              return data;
            }

            do { // pack three octets into four hexets
              o1 = data.charCodeAt(i++);
              o2 = data.charCodeAt(i++);
              o3 = data.charCodeAt(i++);

              bits = o1 << 16 | o2 << 8 | o3;

              h1 = bits >> 18 & 0x3f;
              h2 = bits >> 12 & 0x3f;
              h3 = bits >> 6 & 0x3f;
              h4 = bits & 0x3f;

              // use hexets to index into b64, and append result to encoded string
              tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);

            enc = tmp_arr.join('');

            var r = data.length % 3;

            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
          }

          $scope.error = false;
          $scope.login.carregar = true;

          if(!obj){
            obj = {};
            obj.login = 'null';
            obj.password = 'null';
          } else{
            obj.login = obj.login;
            obj.password = obj.password;
          }

          var request = $http({
            method: 'post',
            url:'//10.1.8.175/server/access.php',
            data:{
              cca : base64_encode(obj.login),
              ssa : base64_encode(obj.password),
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });

          request.
          success(function(data, status){
            if(data.msg !== 0){
              $('#loginModal').modal('hide');
              Auth.setUser(data.user.name);

              $rootScope.logged_in = data.logged_in ;
              $rootScope.dataUser = data.user;
              $rootScope.logged = true;
            }
            else{ 
              $rootScope.logged = false;
              $scope.error = true;
              $scope.errorLogin = 'Usu' + String.fromCharCode(225) +'rio ou senha Inv' + String.fromCharCode(225) + 'lidos';
            }
            $scope.login.carregar = false;
          }).
          error(function(data, status){
            console.log('error code: ' + status );
            $scope.login.carregar = false;
          });
      	};

      }
    };
  });
