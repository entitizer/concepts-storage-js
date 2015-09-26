'use strict';

var utils = require('./utils');
var _ = utils._;
var helpers = require('./helpers');

function WikiPage(data) {
	data = data || {};
	data = _.pick(data, 'id', 'name', 'title', 'redirects', 'type', 'category', 'lang', 'englishTitle', 'englishId', 'description');
	for (var key in data) {
		this[key] = data[key];
	}
	delete this.redirects;
	delete this.name;
	delete this.id;
	this.wikiId = data.id;
	data.names = (data.redirects || []).map(function(name) {
		return name.title;
	});
	if (data.name) {
		data.names.push(data.name);
	}
	data.names.push(data.title);
	this.names = _.uniq(data.names);

	this.id = WikiPage.createId(this.wikiId, this.lang);
	this.titleHash = WikiPage.createTitleHash(this.title, this.lang);
}

WikiPage.create = function(data) {
	return new WikiPage(data);
};

WikiPage.createId = function(id, lang) {
	return helpers.buildWikiPageId(lang, id);
};

WikiPage.createTitleHash = function(title, lang) {
	return helpers.buildWikiPageTitleHash(lang, title);
};

WikiPage.prototype.isValid = function() {
	return _.isNumber(this.wikiId) && this.lang && this.lang.length === 2 && this.title;
};


// exports: =============

module.exports = WikiPage;
