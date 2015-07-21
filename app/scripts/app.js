'use strict';

/**
 * @ngdoc overview
 * @name geoCtfApp
 * @description
 * # geoCtfApp
 *
 * Main module of the application.
 */
angular
  .module('geoCtfApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'chart.js',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/consultar', {
        templateUrl: 'views/stats.html',
        controller: 'EstatisticasCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
