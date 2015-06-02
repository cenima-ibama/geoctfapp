'use strict';

/**
 * @ngdoc function
 * @name geoCtfApp.controller:EstatisticasCtrl
 * @description
 * # EstatisticasCtrl
 * Controller of the geoCtfApp
 */
angular.module('geoCtfApp')
  .controller('EstatisticasCtrl', function ($scope, $rootScope, $cookies, Auth) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

      if(!value && oldValue) {
        console.log("Disconnect");
        $location.path('#/');
      }

      if(value) {
        console.log("Connect");
        //Do something when the user is connected
        alert('isLoggedIn');
      }

    }, true);

    $rootScope.SystemName = $cookies.SystemName;


    $rootScope.map = false;


  })

  // .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
  //   $scope.toggleLeft = buildToggler('left');
  //   $scope.toggleRight = buildToggler('right');
  //   /**
  //    * Build handler to open/close a SideNav; when animation finishes
  //    * report completion in console
  //    */
  //   function buildToggler(navID) {
  //     var debounceFn =  $mdUtil.debounce(function(){
  //           $mdSidenav(navID)
  //             .toggle()
  //             .then(function () {
  //               $log.debug("toggle " + navID + " is done");
  //             });
  //         },300);
  //     return debounceFn;
  //   }
  // })
  // .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  //   $scope.close = function () {
  //     $mdSidenav('left').close()
  //       .then(function () {
  //         $log.debug("close LEFT is done");
  //       });
  //   };
  // })
  // .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  //   $scope.close = function () {
  //     $mdSidenav('right').close()
  //       .then(function () {
  //         $log.debug("close RIGHT is done");
  //       });
  //   };
  // });
