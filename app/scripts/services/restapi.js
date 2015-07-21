'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.RestApi
 * @description
 * # RestApi
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('RestApi', function ($resource, $rootScope) {
    // return $resource('//' + window.location.hostname + window.location.pathname + '/moduleGeoCTF.php?:type', {},
      var url = 'http://10.1.8.178:8000/'
    return $resource(url + 'api/:type/?:subtype', {type: '@type', subtype: '@subtype'},
      {
        get: {
          method:'GET',
          // params:{ format:'json' },
          isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getObject: {
          method:'GET',
          params:{ format:'json' },
          // isArray: false,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getMunicipios: {
          url: url + 'api/:type/:estado',
          method:'GET',
          // params:{ format:'json' },
          // isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getPoints: {
          url: url + 'api/atividades/:municipio/:categoria/',
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
        getToken: {
          url: url + 'api/token-auth/',
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // data: {
          //   'username': '@user',
          //   'password': '@password'
          // },
          // isArray: true,
        },
      },
      {stripTrailingSlashes: false}
    );
  });



