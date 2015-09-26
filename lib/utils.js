/*eslint no-underscore-dangle:1*/

'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var atonic = require('atonic');
var crypto = require('crypto');
var slug = require('slug');

var OBJ_ROMANIAN_CORRECT = {
	'ș': /ş/g,
	'Ș': /Ş/g,
	'ț': /ţ/g,
	'Ț': /Ţ/g
};

function replaceAll(obj, text) {
	for (var prop in obj) {
		text = text.replace(obj[prop], prop);
	}
	return text;
}

function isLetter(s) {
	return s.toUpperCase() !== s.toLowerCase();
}

function isUpper(s) {
	return isLetter(s) && s.toUpperCase() === s;
}

function isLower(s) {
	return isLetter(s) && s === s.toLowerCase();
}

function isDigit(s) {
	return /^\d+$/.test(s);
}

function isLetterOrDigit(s) {
	return isDigit(s) || isLetter(s);
}

function isPunctuation(s) {
	return /[!"#%&'\(\)\*,\.\/:\?@\[\]\\_{}-]/.test(s);
}

function correctText(s, lang) {
	if (!s) {
		return s;
	}
	if (lang === 'ro') {
		return replaceAll(OBJ_ROMANIAN_CORRECT, s);
	}
	return s;
}

function sha1(value) {
	return crypto.createHash('sha1').update(value).digest('hex').toLowerCase();
}

function md5(value) {
	return crypto.createHash('md5').update(value).digest('hex').toLowerCase();
}

function isNull(target) {
	return [undefined, null].indexOf(target) > -1;
}

function isNotNull(target) {
	return !isNull(target);
}

function mongoGetItem(data, nofields) {

	function mapItem(item) {
		return mongoGetItem(item, nofields);
	}

	var _id = data._id;

	data = isNotNull(data.toObject) ? data.toObject() : data;
	for (var prop in data) {
		if (prop === 'id' && _.isNumber(_id)) {
			data[prop] = parseInt(data[prop]);
		} else if (data[prop] === null || nofields.indexOf(prop) > -1) {
			delete data[prop];
		} else if (Array.isArray(data[prop])) {
			data[prop] = data[prop].map(mapItem);
		}
	}
	return data;
}

function mongoGet(data, nofields) {
	nofields = nofields || ['_id', '__v'];
	if (!Array.isArray(nofields)) {
		nofields = [nofields];
	}

	if (data && data.toObject) {
		return mongoGetItem(data, nofields);
	}
	if (data && Array.isArray(data)) {
		return data.map(function(item) {
			return mongoGetItem(item, nofields);
		});
	}
	return data;
}

function isSentenceStartingWord(index, text) {
	text = text.substr(0, index).trim();
	if (text.length === 0) {
		return true;
	}
	var last = text[text.length - 1];
	return /^[!\.\?;-]$/.test(last);
}

// exports =================================================

exports.mongoGet = mongoGet;
exports.isLetter = isLetter;
exports.isDigit = isDigit;
exports.isLetterOrDigit = isLetterOrDigit;
exports.isLower = isLower;
exports.isUpper = isUpper;
exports.isPunctuation = isPunctuation;
exports.correctText = correctText;
exports.atonic = atonic;
exports._ = _;
exports.md5 = md5;
exports.sha1 = sha1;
exports.Promise = Promise;
exports.isSentenceStartingWord = isSentenceStartingWord;
exports.slug = slug;
