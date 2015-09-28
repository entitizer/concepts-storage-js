'use strict';

var utils = require('entitizer.utils');
var slug = require('slug');
var _ = utils._;
var isNotNull = utils.isNotNull;

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

var current = {
	slug: slug,
	mongoGet: mongoGet,
	isSentenceStartingWord: isSentenceStartingWord
};

module.exports = _.assign({}, utils, current);
