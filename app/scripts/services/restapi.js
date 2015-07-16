'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.RestApi
 * @description
 * # RestApi
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('RestApi', function ($resource, appConfig) {
    // return $resource('//' + window.location.hostname + window.location.pathname + '/moduleGeoCTF.php?:type', {},
    return $resource( appConfig.api_url + '/:type/?:subtype', {type: '@type', subtype: '@subtype'},
      {
        get: {
          method:'GET',
          isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getObject: {
          method:'GET',
          params:{ format:'json' },
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getMunicipios: {
          url: appConfig.api_url + '/:type/:estado',
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getPoints: {
          url: appConfig.api_url + '/atividades/:municipio/:categoria',
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        },
        post: {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          isArray: true,
        },
      },
      {stripTrailingSlashes: false}
    );
  });



