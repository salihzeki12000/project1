'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Icpc2trmSchema = new mongoose.Schema({
  termid: Number,
  term30: String,
  nalan50: String,
  icpcode: String,
  termcode: Number,
  status: String,
  replacement: String

});

export default mongoose.model('Icpc2trm', Icpc2trmSchema);
