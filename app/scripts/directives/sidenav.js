'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:sidenav
 * @description
 * # sidenav
 */
var app;

app = angular.module('geoCtfApp');
app.directive('sidenav', sidenavDir);

sidenavDir.$inject = ['RestApi'];

/**
 * Cria e retorna a diretiva <code>sidenave</code>
 * @param RestApi
 * @returns Object
 */
function sidenavDir (RestApi) {

  SideNavController.$inject = ['$scope', '$rootScope', '$mdSidenav', '$mdUtil', 'Auth', '$http'];

  /**
   * Exporta a configuração da diretiva
   * @type Object
   */
  var exports = {
    templateUrl: 'views/partials/sidenav.html',
    restrict: 'E',
    controller : SideNavController
  };

  return exports;

  /**
   * Controller principal da diretiva.
   * @constructor
   */
  function SideNavController ($scope, $rootScope, $mdSidenav, $mdUtil, Auth, $http){

    L.Icon.Default.imagePath = 'images';

    RestApi.get({ type: 'categorias'}, getCategoriaSuccess );

    $scope.filter = {};
    $scope.filter.listMunicipios = false;
    $scope.toggleRight = construirToggle('right');

    $scope.close = closeSidenav;
    $scope.requestPoints = requestPoints;
    $scope.getMunicipios = getMunicipios;
    //$scope.listSubcategoria = listSubcategoria;

    $scope.toggleRight();


    /**
     * Fecha a diretiva
     */
    function closeSidenav () {
      $mdSidenav('right').close();
    }

    /**
     * Apresenta as informaçõe de subCategorias de acordo com a categoria selecionada.
     * @param categoria
     */
    function listSubcategoria (categoria){
      $scope.filter.subCategoria = '';
      if (categoria.id !== 'Todos') {
        $scope.subCategorias = categoria.subcategorias;
      }

      $scope.filter.subcategoria = null
    }

    /**
     * Requisita as informações de <i>features</i> que devem ser apresentadas no mapa
     * de acordo com os filtros estabelecidos.
     * @param filter
     */
    function requestPoints (filter) {

      var categoria = filter.categoria;
      var subCategoria = filter.subcategoria;
      var municipio = filter.municipio.geocodigo;
      var ano = filter.ano;
      var getPointsParams = {};

      $scope.filter.error = false;
      $scope.filter.carregar = true;

      if($scope.markers!== undefined) $scope.map.removeLayer($scope.markers);

      getPointsParams.municipio = municipio;
      getPointsParams.categoria = categoria.id;

      // if($rootScope.dataUser)
      //   getPointsParams.token = $rootScope.dataUser.token;

      if(subCategoria)

        getPointsParams.subcategoria = subCategoria.id;

      if(ano)

        getPointsParams.ano = ano;

      $http.defaults.headers.get = {};

      if (Auth.isLoggedIn()) {
        $http.defaults.headers.get['Authorization'] = 'Token ' + Auth.getToken();
      }

      RestApi.getPoints(getPointsParams, getPointsSuccess);

      $http.defaults.headers.get = {};

      
      /**
       * Função para deleção de features que não estão ativas
       * @param data
       */
      function deleteFeature(data){

        var propertie,
          categoria = $scope.filter.categoria.nome,
          subcategoria = $scope.filter.subcategoria ? $scope.filter.subcategoria.nome : null;

        var dado = data.features.filter(function(a){
          var ret  = a.properties.atividades.filter(function(b){
            if(b.categoria == categoria && (!subcategoria || b.subcategoria === subcategoria)){
              if(b.ativa)
                return b;
            }
          });
          return ret.length > 0;
        });

        if(dado.length)
          data['features'] = dado;
        else
          data = 0;  
        
        return data; 
      }

      /**
       * Função de resultado da requisição de informações de pontos
       * @param data
       */
      function getPointsSuccess(data){
        if(data.features.length) {

          $scope.markers = new L.MarkerClusterGroup();

          data = deleteFeature(data);

          if(data.length){

            $scope.points = L.geoJson(data, {pointToLayer: pointToLayer });

            $scope.map.addLayer($scope.markers);
            $scope.map.fitBounds($scope.markers);

            $scope.filter.carregar = false;
            closeSidenav();
            
          } else {

            $scope.filter.error = true;
            $scope.filter.errorMessage = 'Não foram encontrados registros para o cruzamento selecionado';
            $scope.filter.carregar = false;

          }
        } else {

          $scope.filter.error = true;
          $scope.filter.errorMessage = 'Não foram encontrados registros para o cruzamento selecionado';
          $scope.filter.carregar = false;

        }
      }

    };

    /**
     * Adicion o respectivo feature ao mapa.
     * @param feature
     * @param latlng
     * @returns {*}
     */
    function pointToLayer (feature, latlng) {
      var html = populatePopup(feature);
      return $scope.markers.addLayer(L.circleMarker(latlng).bindPopup(html));
    }

    /**
     * Cria o conteúdo dos popups dos features contidos no mapa.
     * @param object
     * @returns {string}
     */
    function populatePopup(object) {

      var html = '',
        categoria = $scope.filter.categoria.nome,
        subcategoria = $scope.filter.subcategoria ? $scope.filter.subcategoria.nome : null,
        count = 0,
        properties;

      properties = object.properties;

      if(Auth.isLoggedIn())
      {
        html += '<b>Razão social:</b> ' + properties.nome + '<br/>';
        html += '<b>CNPJ:</b> ' + properties.cnpj + '<br/>';
        html += '<b>Fantasia:</b> ' + properties.nome_fantasia + '<br/>';
        html += '<b>Porte:</b> ' + properties.porte + '<br/>';
        html += '<b>Certificado regularidade da pessoa jurídica:</b> ' + (properties.regularidade ? 'Possui Certificado de Regularidade Válido' : 'Não Possui Certificado de Regularidade Válido')+ '<br/><br/>';
        html += '<br/><b>Última atualização do dado em: </b> ' + (properties.data_atualizacao ? properties.data_atualizacao : 'Sem informação de atualização da base de dados')    + '<br/><br/>';
      }

      angular.forEach(properties.atividades, function(atividade, key) {

        if(atividade.categoria == categoria && (!subcategoria || atividade.subcategoria === subcategoria)) {

          if(count)

            html += '<hr />';

          html += '<b>Categoria:</b> ' + atividade.categoria + '<br/>';
          html += '<b>Atividade:</b> ' + atividade.subcategoria + '<br/>';

          if(Auth.isLoggedIn()){
            if( atividade.grau_poluicao == 'Sem')
              atividade.grau_poluicao = '---'
            html += '<b>Grau de Poluicao:</b> ' + atividade.grau_poluicao  + '<br/>';
          }


          count++;
        }
      });

      return html;
    }


    /**
     * Requisita os municípios para serem apresentados na aplicação.
     * @param value
     */
    function getMunicipios (value){

      $scope.municipios = $scope.filter.municipio = '';
      RestApi.getMunicipios({type: 'estado', estado: value.sigla}, getMunicipiosSuccess);

      /**
       * Resultado da requisição dos municípios na aplicação.
       * @param data
       */
      function getMunicipiosSuccess (data) {
        $scope.filter.listMunicipios = true;
        $scope.municipios = data.municipios;
      }
    }

    /**
     *
     * @param nav
     * @returns {*}
     */
    function construirToggle(nav) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(nav)
          .toggle();
      },300);
      return debounceFn;
    }

    /**
     * Função de resultado da requisição de categorias
     * @param data
     */
    function getCategoriaSuccess (data){
      $scope.categorias = data;
    }
  };

};