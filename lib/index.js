'use strict';

var Concept = require('./concept');
var db = require('./db');
var mongoose = require('mongoose');
var AccessService = require('./access_service');
var ControlService = require('./control_service');

function connect(connectionString, options, cb) {
	return mongoose.createConnection(connectionString, options, cb);
}

// exports: ============

exports.AccessService = AccessService;
exports.ControlService = ControlService;
exports.Concept = Concept;
exports.connect = connect;
exports.db = db;
