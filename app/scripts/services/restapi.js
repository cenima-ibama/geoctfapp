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
    return $resource( appConfig.apiUrl + '/:type/?:subtype', {type: '@type', subtype: '@subtype'},
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
        getEstatisticas: {
          url: appConfig.apiUrl + '/estatisticas/:type',
          method:  'GET',
          isArray: true,
          params: { format:'json' },
          headers:{
            'Content-Type': 'application/json'
          }
        },        
        getGeoEstatisticas: {
          url: appConfig.apiUrl + '/geoestatisticas/:type/',
          method:  'GET',
          params: { format:'json' },
          headers:{
            'Content-Type': 'application/json'
          }
        },
        getMunicipios: {
          url: appConfig.apiUrl + '/:type/:estado',
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getPoints: {
          url: appConfig.apiUrl + '/atividades/:municipio/:categoria/',
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
        getToken: {
          url: appConfig.apiUrl + '/token-auth/',
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        },
      },
      {stripTrailingSlashes: false}
    );
  });



