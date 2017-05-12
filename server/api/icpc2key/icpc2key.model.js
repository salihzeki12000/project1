'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Icpc2keySchema = new mongoose.Schema({
  keyid: Number,
  keyword: String
});

export default mongoose.model('Icpc2key', Icpc2keySchema);
