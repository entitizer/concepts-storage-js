'use strict';

var schemas = require('./schemas');
var utils = require('../utils');
var Promise = utils.Promise;

module.exports = function(connection) {
  var db = {};
  schemas.NAMES.forEach(function(model) {
    var m = db[model] = connection.model(model, schemas[model]);
    Promise.promisifyAll(m);
    Promise.promisifyAll(m.prototype);
  });

  return db;
};
