'use strict';

var utils = require('./utils');
var md5 = utils.md5;

function hash(list, separator) {
	separator = separator || '_';
	return md5(list.join('_'));
}

function buildWikiPageId(lang, id) {
	return [lang.toLowerCase(), id].join('');
}

function buildCulture(lang, country) {
	return [lang.toUpperCase(), country.toUpperCase()].join('_');
}

function buildWikiPageTitleHash(lang, name) {
	return hash([lang.toLowerCase(), name]);
}

function buildConceptId(country, lang, name) {
	return hash([country.toLowerCase(), lang.toLowerCase(), name.toLowerCase()]);
}

function buildConceptNameHash(lang, name) {
	return hash([lang.toLowerCase(), name.toLowerCase()]);
}

function isConceptIrregular(name) {
	var ch;
	var foundLower = false;
	for (var i = 0; i < name.length; i++) {
		ch = name[i];
		if (utils.isLower(ch)) {
			if (!foundLower) {
				foundLower = i === 0 || /\s/.test(name[i - 1]);
			}
		} else if (utils.isUpper(ch) && i > 0) {
			if (foundLower) {
				return true;
			}
		}
		if (utils.isDigit(ch)) {
			return true;
		}
	}

	return false;
}

function getWordSuffixLength(word) {
	if (word.length < 6 || isConceptIrregular(word)) {
		return 0;
	}
	if (word.length < 8) {
		return 1;
	}
	if (word.length < 10) {
		return 2;
	}
	return 3;
}

function createConceptRootName(name, lang) {
	var words = name.split(/\s+/g);
	words = words.map(function(word) {
		var l = getWordSuffixLength(word, lang);
		if (l > 0) {
			word = word.substr(0, word.length - l + (words.length === 1 ? 1 : 0));
		}
		return word;
	});

	return words.join(' ');
}


// exports: =============

exports.buildConceptId = buildConceptId;
exports.buildEntityId = buildConceptId;
exports.buildCulture = buildCulture;
exports.buildConceptNameHash = buildConceptNameHash;
exports.isConceptIrregular = isConceptIrregular;
exports.createConceptRootName = createConceptRootName;
exports.buildWikiPageTitleHash = buildWikiPageTitleHash;
exports.buildWikiPageId = buildWikiPageId;
