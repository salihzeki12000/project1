'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LookupSchema = new mongoose.Schema({
  linkeyword: String,
  keyword: String,
  termid:[Number]
});

export default mongoose.model('Lookup', LookupSchema);
