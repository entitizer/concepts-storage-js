'use strict';

var Concept = require('../lib/concept');
var assert = require('assert');

describe('Concept', function() {
	it('Владимир Путин', function() {
		var concept = new Concept({
			value: 'Владимир Путин',
			lang: 'ru',
			country: 'ru'
		});
		assert.equal('Владимир Путин', concept.name);
		assert.equal('ru', concept.lang);
	});
	it('Влади́мир Влади́мирович Пу́тин', function() {
		var concept = new Concept({
			name: 'Влади́мир Влади́мирович Пу́тин ',
			context: {
				lang: 'ru',
				country: 'ru'
			}
		});
		assert.equal('Влади́мир Влади́мирович Пу́тин', concept.name);
		assert.equal('ru', concept.lang);
	});
	it('lang required', function() {
		assert.throws(function() {
			var concept = new Concept({
				name: 'Вячеслав Войнов',
				abbr: 'BB'
			});
			assert.ok(concept);
		});
	});
});
