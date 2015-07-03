'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.RestApi
 * @description
 * # RestApi
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('RestApi', function ($resource) {
    // return $resource('//' + window.location.hostname + window.location.pathname + '/moduleGeoCTF.php?:type', {},
    return $resource('http://10.1.8.138:8000/api/:type/?:subtype', {type: '@type', subtype: '@subtype'},
      {
        get: {
          method:'GET',
          // params:{ format:'json' },
          isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getMunicipios: {
          url: 'http://10.1.8.138:8000/api/:type/:estado',
          method:'GET',
          // params:{ format:'json' },
          // isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getPoints: {
          url: 'http://10.1.8.138:8000/api/atividades/:municipio/:categoria',
          method:'GET',
          // params:{ format:'json' },
          // isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        post: {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // data: type,
          isArray: true,
        },
      },
      {stripTrailingSlashes: false}
    );
  });



