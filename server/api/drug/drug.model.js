'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DrugSchema = new mongoose.Schema({
  code:String,
  label:String,
  codinginfo:String

});

export default mongoose.model('Drug', DrugSchema);
