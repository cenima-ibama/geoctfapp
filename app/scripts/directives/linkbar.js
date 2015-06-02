'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:linkbar
 * @description
 * # linkbar
 */
angular.module('geoCtfApp')
  .directive('linkbar', function () {
    return {
      templateUrl: 'views/partials/linkbar.html',
      restrict: 'E',
      controller: function($scope){

        $scope.subcategorias = [];

        $scope.baseUrl = 'images/icons';
        $scope.ufs = [
            { name: 'AC', image: $scope.baseUrl + '/AC.png', subtitle: 'AC' },
            { name: 'AM', image: $scope.baseUrl + '/AM.png', subtitle: 'AM' },
            { name: 'AP', image: $scope.baseUrl + '/AP.png', subtitle: 'AP' },
            { name: 'MA', image: $scope.baseUrl + '/MA.png', subtitle: 'MA' },
            { name: 'MT', image: $scope.baseUrl + '/MT.png', subtitle: 'MT' },
            { name: 'PA', image: $scope.baseUrl + '/PA.png', subtitle: 'PA' },
            { name: 'RO', image: $scope.baseUrl + '/RO.png', subtitle: 'RO' },
            { name: 'RR', image: $scope.baseUrl + '/RR.png', subtitle: 'RR' },
            { name: 'TO', image: $scope.baseUrl + '/TO.png', subtitle: 'TO' },
            { name: 'BR', image: $scope.baseUrl + '/BR.png', subtitle: 'Amazônia Legal' }
        ];

        // $scope.myItems = [];

        // $scope.addVal = function(val){
        //   $scope.myItems.push(val);
        // }
      }
    };
  });
