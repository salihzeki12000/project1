'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    Schema = mongoose.Schema;

var ThingSchema = new mongoose.Schema({
  encnum: Number,
  encdate: String,
  starttime: String,
  finishtime: String,
	bill: String,
  medicare: [{text:String}],
  // nonmedicare: String,
  enabled:Boolean,
  status:String,
  owner: {
     type: Schema.ObjectId,
     ref:'User'
  },
  patient:{
     gender: String,
     post: Number,
     dob: String,
     conditions:{
  		newpatient: String,
  		healthcare: String,
  		veterans: String,
  		nesb: String,
  		aboriginal: String,
  		torres: String
  	 },
     height: Number,
     weight: Number,
     smoking: String,
     drinking: String,
     drinks: Number,
     moredrink: String,
	   timesgp:Number,
     consultation:String
  },
  reason:[{
     rnum: Number,
     rname: String,
	   icpc2plus: String
	}],
  diagnosis:[{
		dnum: Number,
		name: String,
    status: String,
		icpc2plus: String,
		drug:[{
		  drnum: Number,
		  drcode: String,
		  drname: String,
			codinginfo:String,
		  drdose: Number,
		  dosmeasure: String,
			drfreqnum: Number,
		  drfreq: String,
		  drnorep: Number,
		  drstatus:{
			  name: String
			},
		  others:{
				name:String
			},
      enabled:Boolean
		}],
		procedure:[{
		  pnum: Number,
		  pname: String,
		  pnurse: Boolean,
		  icpc2plus: String,
      enabled:Boolean
		}],
		referral:[{
		  rnum: Number,
		  rname: String,
		  icpc2plus: String,
      enabled:Boolean
		}],
		imaging:[{
		  inum: Number,
		  iname: String,
		  bodysite: String,
		  icpc2plus: String,
      enabled:Boolean
		}],
		pathology:[{
		  pnum: Number,
		  pname: String,
		  icpc2plus: String,
      enabled:Boolean
		}]
	}]

});

export default mongoose.model('Thing', ThingSchema);
