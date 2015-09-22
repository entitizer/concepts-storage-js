'use strict';

var utils = require('./utils');
var get = utils.mongoGet;
var models = require('./db/schemas').NAMES;
var actions = ['create', 'update', 'remove'];
var assert = require('assert');

var Service = module.exports = function(db) {
	this.db = db;
};

function checkModel(model) {
	if (models.indexOf(model) < 0) {
		throw new Error('Invalid model: ' + model);
	}
}

/**
 * Create item
 */
Service.prototype.create = function(model, data) {
	checkModel(model);
	assert.ok(data);

	data._id = data._id || data.id;

	// data = formatter['normalize' + model](data);

	return this.db[model].createAsync(data).then(get);
};

/**
 * Update item
 */
Service.prototype.update = function(model, data) {
	checkModel(model);
	assert.ok(data);

	data.updatedAt = data.updatedAt || new Date();
	return this.db[model].findByIdAndUpdateAsync(data.id, data).then(get);
};

/**
 * Remove item
 */
Service.prototype.remove = function(model, data) {
	checkModel(model);
	assert.ok(data);

	return this.db[model].removeAsync(data.where).then(get);
};

/**
 * Builds API
 */
models.forEach(function(model) {
	actions.forEach(function(action) {
		Service.prototype[action + model] = function(data) {
			return this[action](model, data);
		};
	});
});
