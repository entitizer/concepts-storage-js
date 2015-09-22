'use strict';

var Concept = require('../lib/concept');
// var assert = require('assert');

describe('Concept', function() {
	it('Владимир Путин', function() {
		var concept = new Concept({
			name: 'Владимир Путин',
			lang: 'ru',
			country: 'ru'
		});
		concept.build();
	});
	it('Влади́мир Влади́мирович Пу́тин', function() {
		var concept = new Concept({
			name: 'Влади́мир Влади́мирович Пу́тин ',
			lang: 'ru',
			country: 'ru'
		});
		concept.build();
	});
	it('Вячеслав Войнов', function() {
		var concept = new Concept({
			name: 'Вячеслав Войнов',
			abbr: 'BB'
		});
		concept.build({
			lang: 'ru',
			country: 'ru'
		});
		console.log(concept);
	});
});
