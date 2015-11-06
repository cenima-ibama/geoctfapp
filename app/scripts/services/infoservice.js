'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.infoService
 * @description
 * # infoService
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .service('infoService', function () {
  	var atividadeCategoria,
  		atividadeUF,
  		atividadeMapa,
  		pessoaPorte,
  		pessoaRegularidade,
  		pessoaMapa,
  		inscricaoAnoAtual,
  		inscricaoAnoTotal,
  		inscricaoSerie,
  		acute = String.fromCharCode(225),
  		icute = String.fromCharCode(237),
  		atil  = String.fromCharCode(225),
  		cedil = String.fromCharCode(231),
  		ecute = String.fromCharCode(233),
  		ucute = String.fromCharCode(250),
  		apick = String.fromCharCode(224),
  		ocute = String.fromCharCode(243);


	atividadeCategoria= 'Este gr' + acute + 'fico representa a quantidade de pessoas jur' + icute + 'dicas*' +
						' agrupadas pelas atividades que exercem ou exerciam no ano selecionado,' +
						' de acordo com a regi' + atil + 'o e atividades selecionados<br/><br/>'+
						'* cada pessoa jur' + icute + 'dica pode exercer uma ou mais atividades do CTF/APP';

	atividadeUF =	'Este gr' + acute + 'fico representa a quantidade de pessoas jur' + icute + 'dicas*' +
					' que exercem ou exerciam as atividades selecionadas no ano escolhido,' +
					' agrupadas pela respectiva unidade de federa' + cedil + atil + 'o,' +
					' de acordo com a regi' + atil + 'o selecionada na pesquisa<br/><br/>' +
					'* cada pessoa jur' + icute + 'dica pode exercer uma ou mais atividades do CTF/APP';
	
	atividadeMapa = 'Este mapa representa a quantidade de pessoas jur' + icute + 'dicas*' +
					' que exercem ou exerciam as atividades selecionadas no ano escolhido.' +
					' O agrupamento ' + ecute + ' realizado pela respectiva unidade de federa' +
					cedil + atil + ', de acordo com a regi' + atil + 'o selecionada na pesquisa<br/><br>' +
					'* cada pessoa jur' + icute + 'dica pode exercer uma ou mais atividades do CTF/APP';

	pessoaPorte = 	'Este gr' + acute + 'fico representa a quantidade de pessoas jur' + icute + 'dicas' +
					' distintas agrupadas pelo porte*, de acordo com a regi' + atil + 'o selecionada,' +
					' que exercem ou exerciam atividades escolhidas no ano selecionado.<br/><br/>' +
					'* independente dos crit'+ecute+'rios de pesquisa informados, o porte refere-se ao ano atual';

	pessoaRegularidade = 	'Este gr' + acute + 'fico representa a quantidade de pessoas jur' + icute + 'dicas' +
							' distintas pela condi' + cedil + atil + 'o de possuir ou n' + atil + 'o um certificado' + 
							' de regularidade v' + acute + 'lido* emitido pelo IBAMA, de acordo com a a regi' + atil + 'o' +
							' selecionada, que exercem ou exerciam as atividades escolhidas no ano selecionado<br/><br/>'+
							'* Esta condi' + cedil + atil + 'o de validade refere-se ao momento da ' + ucute + 'ltima' +
							' desta ferramenta na base de dados do IBAMA';

	pessoaMapa = 	'Este mapa representa a quantidade de pessoas jur' + icute + 'dicas distintas que exercem ou'+
					' exerciam as atividades selecionadas no ano escolhido. O agrupamento ' + ecute + 'realizado' +
					' pela respectiva unidade de federa' + cedil + atil + 'o, de acordo com a regi' + atil + 'o' +
					' selecionada na pesquisa. A escola de cor apresentada ' + ecute + ' proporcional ' + apick + 
					'quantidade de pessoas jur' + icute + 'dicas.';

	inscricaoAnoAtual = 'Este gr' + acute + 'fico representa a quantidade de pessoas jur' + icute + 'dicas' +
						'que exercem ou exerciam as atividades selecionadas, agrupadas pela respectiva unidade de '
						'federa' + cedil + atil + 'o, de acordo com a regi' + atil + 'o escolhida na pesquisa' +
						'e inscritas no CTF/APP no ano selecionado';

	inscricaoAnoTotal = 'Este gr' + acute + 'fico representa a quantidade cumulativa de pessoas jur' + icute + 'dicas' +
						' inscritas no CTF/APP at' + ecute + ' o ano selecionado, que exercem ou exerciam as atividades' +
						' escolhidas, agrupadas pela respectiva unidade de federa' + cedil + atil + 'o, de acordo com'+
						' a regi' + atil + 'o selecionada na pesquisa';

	inscricaoSerie = 	'Este gr' + acute + 'fico representa a s' + ecute + 'rie hist' + ocute + 'rica da quantidade' + 
						' cumulativa de pessoas jur' + icute + 'dicas inscritas no CTF/APP at' + ecute + ' determinado ano,' + 
						' que exercem ou exerciam as atividades escolhidas, de acordo com a regi' + atil + 'o e atividades selecionados'; 

  	return {
   		atividadeCategoria: atividadeCategoria,
  		atividadeUF: atividadeUF,
  		atividadeMapa: atividadeMapa,
  		pessoaPorte: pessoaPorte,
  		pessoaRegularidade: pessoaRegularidade,
  		pessoaMapa: pessoaMapa,
  		inscricaoAnoAtual: inscricaoAnoAtual,
  		inscricaoAnoTotal: inscricaoAnoTotal,
  		inscricaoSerie: inscricaoSerie
  	}
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
