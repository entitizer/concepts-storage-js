'use strict';

var utils = require('./utils');
var _ = utils._;
var helpers = require('./helpers');

function Concept(data) {
	data = data || {};
	data = _.pick(data, 'value', 'name', 'index', 'atonic', 'abbr', 'country', 'lang', 'context');
	for (var key in data) {
		this[key] = data[key];
	}
	if (this.value && !this.name) {
		this.name = this.value;
	}

	if (data.name) {
		delete this.atonic;
	}

	delete this.value;
	delete this.context;

	this.lang = data.lang || data.context && data.context.lang;
	this.country = data.country || data.context && data.context.country;

	this.name = this.name.trim();
	this.lang = this.lang.toLowerCase();
	this.country = this.country.toLowerCase();

	this.popularity = this.popularity || 1;
	this.countWords = this.name.split(/\s+/g).length;

	this.isIrregular = helpers.isConceptIrregular(this.name);
	this.isAbbr = this.name === this.name.toUpperCase();

	this.id = helpers.buildConceptId(this.country, this.lang, this.name);

	this.nameHash = Concept.createNameHash(this.name, this.lang);

	this.rootName = helpers.createConceptRootName(this.name, this.lang);
	this.rootNameHash = Concept.createNameHash(this.rootName, this.lang);

	this.atonic = this.atonic || utils.atonic(this.name);
	this.atonicHash = Concept.createNameHash(this.atonic, this.lang);

	this.rootAtonic = helpers.createConceptRootName(this.atonic, this.lang);
	this.rootAtonicHash = Concept.createNameHash(this.rootAtonic, this.lang);
}

Concept.create = function(data) {
	return new Concept(data);
};

Concept.createAtonicId = function(name, lang) {
	return helpers.buildConceptNameHash(lang, utils.atonic(name.toLowerCase()));
};

Concept.createNameHash = function(name, lang) {
	return helpers.buildConceptNameHash(lang, name);
};

Concept.prototype.isSentenceStartingWord = function(text, index) {
	return utils.isSentenceStartingWord(this.index || index || 0, text);
};

Concept.prototype.isValid = function() {
	var value = this.name;
	if (!value || value.length < 2 || /^\d+$/.test(value)) {
		return false;
	}

	if (utils.isLower(value)) {
		return false;
	}

	if (value.length !== value.trim().length) {
		//throw new Error('Trim value is not === with value: "'+ value+'"');
		return false;
	}

	if (value.length === 2 && utils.isPunctuation(value[1])) {
		return false;
	}

	return true;
};

// exports: =============

module.exports = Concept;
