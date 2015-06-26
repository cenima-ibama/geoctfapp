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
        { nome: 'Brasil', regiao: 'brasil', sigla: 'BR', value: 'Todos'},
        { nome: 'Acre', regiao: 'norte', sigla: 'AC'},
        { nome: 'Amapá', regiao: 'norte', sigla: 'AP'},
        { nome: 'Amazonas', regiao: 'norte', sigla: 'AM'},
        { nome: 'Pará', regiao: 'norte', sigla: 'PA'},
        { nome: 'Rondônia', regiao: 'norte', sigla: 'RO'},
        { nome: 'Roraima', regiao: 'norte', sigla: 'RR'},
        { nome: 'Tocantins', regiao: 'norte', sigla: 'TO'},
        { nome: 'Alagoas', regiao: 'nordeste', sigla: 'AL'},
        { nome: 'Bahia', regiao: 'nordeste', sigla: 'BA'},
        { nome: 'Ceará', regiao: 'nordeste', sigla: 'CE'},
        { nome: 'Maranhão', regiao: 'nordeste', sigla: 'MA'},
        { nome: 'Paraíba', regiao: 'nordeste', sigla: 'PB'},
        { nome: 'Pernambuco', regiao: 'nordeste', sigla: 'PE'},
        { nome: 'Piauí', regiao: 'nordeste', sigla: 'PI'},
        { nome: 'Rio Grande do Norte', regiao: 'nordeste', sigla: 'RN'},
        { nome: 'Sergipe', regiao: 'nordeste', sigla: 'SE'},
        { nome: 'Distrito Federal', regiao: 'centro', sigla: 'DF'},
        { nome: 'Goiás', regiao: 'centro', sigla: 'GO'},
        { nome: 'Mato Grosso', regiao: 'centro', sigla: 'MT'},
        { nome: 'Mato Grosso do Sul', regiao: 'centro', sigla: 'MS'},
        { nome: 'Espírito Santo', regiao: 'sudeste', sigla: 'ES'},
        { nome: 'Minas Gerais', regiao: 'sudeste', sigla: 'MG'},
        { nome: 'Rio de Janeiro', regiao: 'sudeste', sigla: 'RJ'},
        { nome: 'São Paulo', regiao: 'sudeste', sigla: 'SP'},
        { nome: 'Paraná', regiao: 'sul', sigla: 'PR'},
        { nome: 'Rio grande do Sul', regiao: 'sul', sigla: 'RS'},
        { nome: 'Santa Catarina', regiao: 'sul', sigla: 'SC'},
      ]

    };

    return data;

  });
