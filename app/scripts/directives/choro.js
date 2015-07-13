'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:cloro
 * @description
 * # cloro
 */
angular.module('geoCtfApp')
  .directive('choro', function () {
    return {
      templateUrl: 'views/partials/choro.html',
      restrict: 'AE',
      // link: function postLink(scope) {
      // },
      controller: function($scope){

        $scope.choroMap = L.map('choroMap', {
          center: [-15.5, -52],
          zoom: 4,
          minZoom: 4,
          maxZoom: 4,
          zoomControl: false
        });

        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        L.tileLayer('http://a.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
          // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          attribution: '&copy; Maps <a href="http://www.thunderforest.com">Thunderforest</a>, Data <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo($scope.choroMap);


        var getColor = function(d) {
          var value = $.grep($scope.steps, function(e){ return e.num == d; })[0];
          // using hsl over rgb for better color adjustment (fixing the color and the saturation, and varying the light)
          return 'hsl(101, 80%, ' + value.color + '%)';
        }; 

        var style = function(feature) {
            return {
                fillColor: getColor(feature.properties.num_atividades),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.85
            };
        };

        var fillColors = function(steps) {

          for (var i=0; i < steps.length; i++) {

            // calculate the porcentage which represents that number, considering the full range activities
            var color = steps[i].num * 100 / steps[steps.length-1].num;

            // since 100% represent full light, we get the inverted state
            color = 100 - color;

            // remove lights between 0% to 10% and 90% to 100% (for not showing full white and full green)
            color = (color * 0.8) + 10;

            // stores the color to its element
            steps[i].color =  Math.ceil(color);
            $scope.steps.push(steps[i]);
          };

        };

        function highlightFeature(e) {
          var layer = e.target;

          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });

          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          
          $scope.info.update(layer.feature.properties);
        };

        function resetHighlight(e) {
          $scope.geojson.resetStyle(e.target);
          $scope.info.update();
        };

        function zoomToFeature(e) {
          map.fitBounds(e.target.getBounds());
        };

        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        };
        
        var info = L.control();

        info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
          if (props) {
            this._div.classList.add('info-show');

            // adding thousand separator
            var atv = props.num_atividades.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          } else {
            this._div.classList.remove('info-show');
          }


          this._div.innerHTML = '<h4> N° de Atividades </h4> ' + (props ?
              '<b> ' + props.nome + ':</b> ' + ' <br />' + atv + ' atividades '
              : '');
        };

        $scope.info = info;

        $scope.$on('drawchoro', function(event, dado){

          var steps = [];
          $scope.steps = [];

          $.each(dado.features, function(key,value){
            steps.push({'num': value.properties.num_atividades, 'color': ''});
          });

          steps = dado['features'].map(function(value) {
            return {'num': value.properties.num_atividades, 'color': ''};
          })

          steps.sort(function(a, b){return a.num-b.num});
          fillColors(steps);

          if ($scope.geojson) {
            $scope.choroMap.removeLayer($scope.geojson);
          }

          $scope.choroMap.dragging.enable();
          $scope.geojson = L.geoJson(dado, {style: style, onEachFeature: onEachFeature}).addTo($scope.choroMap);
          $scope.choroMap.fitBounds($scope.geojson.getBounds());
          $scope.info.addTo($scope.choroMap);
          $scope.choroMap.dragging.disable();

          $scope.carregar.choro = false;
        });
      }
    };
  });
