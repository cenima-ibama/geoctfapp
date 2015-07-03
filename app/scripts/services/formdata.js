'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.formData
 * @description
 * # formData
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .service('formData', function () {

    var data,
      current,
      years = [],
      startYear = 1988,
      endYear = (new Date()).getFullYear();

    current = startYear;

    while(current <= endYear){
      years.unshift(current);
      current++;
    }

    years.unshift('Todos');

    data = {

      anos : years,

      estados : [
        { nome: 'Acre', regiao: 'Norte', sigla: 'AC'},
        { nome: 'Amapá', regiao: 'Norte', sigla: 'AP'},
        { nome: 'Amazonas', regiao: 'Norte', sigla: 'AM'},
        { nome: 'Pará', regiao: 'Norte', sigla: 'PA'},
        { nome: 'Rondônia', regiao: 'Norte', sigla: 'RO'},
        { nome: 'Roraima', regiao: 'Norte', sigla: 'RR'},
        { nome: 'Tocantins', regiao: 'Norte', sigla: 'TO'},
        { nome: 'Alagoas', regiao: 'Nordeste', sigla: 'AL'},
        { nome: 'Bahia', regiao: 'Nordeste', sigla: 'BA'},
        { nome: 'Ceará', regiao: 'Nordeste', sigla: 'CE'},
        { nome: 'Maranhão', regiao: 'Nordeste', sigla: 'MA'},
        { nome: 'Paraíba', regiao: 'Nordeste', sigla: 'PB'},
        { nome: 'Pernambuco', regiao: 'Nordeste', sigla: 'PE'},
        { nome: 'Piauí', regiao: 'Nordeste', sigla: 'PI'},
        { nome: 'Rio Grande do Norte', regiao: 'Nordeste', sigla: 'RN'},
        { nome: 'Sergipe', regiao: 'Nordeste', sigla: 'SE'},
        { nome: 'Distrito Federal', regiao: 'Centro-Oeste-Oeste', sigla: 'DF'},
        { nome: 'Goiás', regiao: 'Centro-Oeste', sigla: 'GO'},
        { nome: 'Mato Grosso', regiao: 'Centro-Oeste', sigla: 'MT'},
        { nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste', sigla: 'MS'},
        { nome: 'Espírito Santo', regiao: 'Sudeste', sigla: 'ES'},
        { nome: 'Minas Gerais', regiao: 'Sudeste', sigla: 'MG'},
        { nome: 'Rio de Janeiro', regiao: 'Sudeste', sigla: 'RJ'},
        { nome: 'São Paulo', regiao: 'Sudeste', sigla: 'SP'},
        { nome: 'Paraná', regiao: 'Sul', sigla: 'PR'},
        { nome: 'Rio grande do Sul', regiao: 'Sul', sigla: 'RS'},
        { nome: 'Santa Catarina', regiao: 'Sul', sigla: 'SC'},
      ]

    };

    return data;

  });
