'use strict';

var utils = require('./utils');
var _ = utils._;
var helpers = require('./helpers');

function Concept(data) {
	data = data || {};
	data = _.pick(data, 'value', 'name', 'index', 'atonic', 'abbr', 'country', 'lang');
	for (var key in data) {
		this[key] = data[key];
	}
	if (this.value) {
		this.name = this.value;
		delete this.value;
	}
}

Concept.create = function(data) {
	return new Concept(data);
};

Concept.prototype.build = function(data) {
	if (data) {
		data = _.pick(data, 'country', 'lang');
		for (var key in data) {
			this[key] = data[key];
		}
	}
	this.name = this.name.trim();
	this.lang = this.lang.toLowerCase();
	this.country = this.country.toLowerCase();

	this.popularity = this.popularity || 1;
	this.countWords = this.name.split(/\s+/g).length;

	this.isIrregular = helpers.isConceptIrregular(this.name);
	this.isAbbr = this.name === this.name.toUpperCase();

	this.id = helpers.buildConceptId(this.country, this.lang, this.name);

	this.nameHash = helpers.buildConceptNameHash(this.lang, this.name);

	this.rootName = helpers.createConceptRootName(this.name, this.lang);
	this.rootNameHash = helpers.buildConceptNameHash(this.lang, this.rootName);

	this.atonic = this.atonic || utils.atonic(this.name);
	this.atonicHash = helpers.buildConceptNameHash(this.lang, this.atonic);

	this.rootAtonic = helpers.createConceptRootName(this.atonic, this.lang);
	this.rootAtonicHash = helpers.buildConceptNameHash(this.lang, this.rootAtonic);

	return this;
};


// exports: =============

module.exports = Concept;
