'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.appConfig
 * @description
 * # appConfig
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .service('appConfig', function () {

    return {

      api_url : 'http://10.1.8.178:8000/api'

    }

  });
