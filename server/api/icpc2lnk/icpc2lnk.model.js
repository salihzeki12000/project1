'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var Icpc2lnkSchema = new mongoose.Schema({
  keyid: Number,
  termid: Number
});

export default mongoose.model('Icpc2lnk', Icpc2lnkSchema);
