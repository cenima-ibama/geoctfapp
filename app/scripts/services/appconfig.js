'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.appConfig
 * @description
 * # appConfig
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('appConfig', function () {

    return {

      apiUrl : 'http://10.1.8.28:82/ctfapi/api'

    };

  });
