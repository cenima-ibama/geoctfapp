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
      controller: function($scope, $timeout, $mdSidenav, $mdUtil, $log, Auth){

        $scope.filter = {};
        $scope.filter.listMunicipios = false;

        L.Icon.Default.imagePath = 'images';

        $scope.requestPoints = function(value){
          $scope.filter.error = false;
          $scope.filter.carregar = true;

          function populatePopup(object){
            // console.log(Auth.isLoggedIn());
            var html = '<b>' + object.properties.atividades[0].empresa  + '</b><br/><hr />' ;
            angular.forEach(object.properties.atividades, function(value, key){
              
              // console.log(value.inicio_atividade);
              // var data = value.inicio_atividade.split('-');
              // var data = data[2] + '-' + data[1] + '-' + data[0];

              html += '<b>Categoria:</b> ' + value.categoria + '<br/>';
              html += '<b>Subcategoria:</b> ' + value.subcategoria + '<br/>';
              html += '<b>Grau de Poluicao:</b> ' + value.grau_poluicao  + '<br/>';
              if(Auth.isLoggedIn())html += '<b>Inicio da Atividade:</b> ' + value.inicio_atividade + '<br/>';
              html += '<hr />';
            })
            return html;
          }

          if($scope.markers!== undefined) $scope.map.removeLayer($scope.markers);

          var categoria = value.categoria;
          var subCategoria = value.subCategoria;
          var municipio = value.municipio.geocodigo;
          if(categoria){
            if(subCategoria !== '' && subCategoria.nome !== 'Todos')
              var restCategoria = subCategoria.id;
            else
              var restCategoria = categoria.id;
          }

          RestApi.getPoints({municipio: municipio, categoria: restCategoria}, 
            function success(data){
            // function success(data){
              if(data.features[0]){
                $scope.markers = new L.MarkerClusterGroup();
                $scope.points = L.geoJson(data, {
                  pointToLayer: function(feature, latlng) {
                    var html = populatePopup(feature);
                    return $scope.markers.addLayer(L.marker(latlng).bindPopup(html));
                  },
                });
                
                $scope.map.addLayer($scope.markers);
                $scope.map.fitBounds($scope.markers);

                $scope.filter.carregar = false;
                $mdSidenav('right').close();
                
              } else {
                $scope.filter.error = true;
                $scope.filter.errorMessage = 'Não foram encontrados pontos para este cruzamento';
                $scope.filter.carregar = false;


              }
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
