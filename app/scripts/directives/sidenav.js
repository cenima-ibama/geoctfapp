'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('geoCtfApp')
  .directive('sidenav', function (RestApi) {
    return {
      templateUrl: 'views/partials/sidenav.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //     event.preventDefault();
      // },
      controller: function($scope, $timeout, $mdSidenav, $mdUtil, $log){

        $scope.filter = {};
        $scope.filter.listMunicipios = false;

        $scope.requestPoints = function(value){

          var categoria = value.categoria;
          var subCategoria = value.subCategoria;
          var municipio = value.municipio.geocodigo;

          if(categoria){
            if(subCategoria !== '')
              var restCategoria = subCategoria.id;
            else
              var restCategoria = categoria.id;
          }

          $log.debug('atividades/' + municipio + '/' + restCategoria );

          function populatePopup(object){
            var html = '';
            html += '<b>Número da Ordem:</b> '+object.properties.num_ordem_fiscalizacao + "<br/>";
            html += '<b>Estado:</b> '+object.properties.nom_uf + "<br/>";
            html += '<b>Total Autos:</b> '+object.properties.total_autos + "<br/>";
            html += '<b>Valor Total Autos:</b> '+object.properties.valor_total_autos_formatado + "<br/>";
            html += '<b>Total Apreensão:</b> '+object.properties.total_apreensao + "<br/>";
            html += '<b>Tipo Infração:</b> '+object.properties.tipo_infracao + "<br/>";
            html += '<b>Descrição do Local da Ação:</b> '+object.properties.des_local_acao + "<br/>";
            html += '<b>Municipio Ação:</b> '+object.properties.municipios_acao + "<br/>";
            return html;
          }

        // var markers;

          RestApi.getPoints({municipio: municipio, categoria: restCategoria}, function(data){
            // function success(data){
              var markers = new L.MarkerClusterGroup();
              $scope.points = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                  var html = populatePopup(feature);
                  return markers.addLayer(L.marker(latlng).bindPopup(html));
                },
              });
             $scope.map.addLayer(markers);

              $mdSidenav('right').close();
          });

        };

        $scope.getMunicipios = function(value){
          $scope.municipios = $scope.filter.municipio = '';

          RestApi.getMunicipios({type: 'estado', estado: value.sigla}, function(data){
            $scope.filter.listMunicipios = true;
            $scope.municipios = data.municipios;
          });
        };

        function construirToggle(nav) {
          var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(nav)
                  .toggle();
              },300);
          return debounceFn;
        }

        $scope.toggleRight = construirToggle('right');
        
        $scope.close = function(){
          $mdSidenav('right').close();
        };


        RestApi.get({ type: 'categorias'}, function(data){
          $scope.categorias = data;
          // $scope.filter.categorias.push({id: 'Todos' , nome: 'Todos'});
        });

        $scope.listSubcategoria = function(categoria){
          $scope.filter.subCategoria = '';
          if(categoria.id !== 'Todos'){
            $scope.subCategorias = categoria.subcategorias;
            $scope.subCategorias.push({id: 'Todos' , nome: 'Todos'});
          }
        }






      },
    };
  });
