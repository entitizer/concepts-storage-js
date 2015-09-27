'use strict';

var utils = require('./utils');
var _ = utils._;
var helpers = require('./helpers');

function Entity(data) {
	data = data || {};
	data = _.pick(data, 'wikiPage', 'name', 'uniqueName', 'country', 'category', 'lang', 'atonic', 'population');
	for (var key in data) {
		this[key] = data[key];
	}
	this.lang = data.lang.toLowerCase();
	this.country = data.country.toLowerCase();
	this.atonic = data.atonic || utils.atonic(data.name.toLowerCase());
	this.uniqueName = this.uniqueName || Entity.createUniqueName(this.atonic);

	this.id = Entity.createId(this.uniqueName, this.lang, this.country);
}

Entity.create = function(data) {
	return new Entity(data);
};

Entity.createId = function(id, lang) {
	return helpers.buildWikiPageId(lang, id);
};

Entity.createUniqueName = function(name) {
	return utils.slug(utils.atonic(name.toLowerCase()));
};

Entity.prototype.isValid = function() {
	return _.isNumber(this.wikiId) && this.lang && this.lang.length === 2 && this.title;
};


// exports: =============

module.exports = Entity;
