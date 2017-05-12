/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) {

  // require('./config/seed');
    // require('./config/seedDrug');
    // require('./config/seedDrug_2');
    // require('./config/seedDrug_3');
    // require('./config/seedDrug_4');
    // require('./config/seedDrug_5');
    // require('./config/seedDrug_6');
    // require('./config/seedDrug_7');
    // require('./config/seedDrug_8');
    // require('./config/seedDrug_9');
    // require('./config/seedDrug_10');
    // require('./config/seedDrug_11');
    // require('./config/seedDrug_12');

  // require('./config/seedIcpc2key');
  // require('./config/seedIcpc2key_2');
  // require('./config/seedIcpc2key_3');

  // require('./config/seedIcpc2lnk');
  // require('./config/seedIcpc2lnk_2');
  // require('./config/seedIcpc2lnk_3');
  // require('./config/seedIcpc2lnk_4');
  // require('./config/seedIcpc2lnk_5');
  // require('./config/seedIcpc2lnk_6');
  // require('./config/seedIcpc2lnk_7');
  // require('./config/seedIcpc2lnk_8');
  // require('./config/seedIcpc2lnk_9');
  // require('./config/seedIcpc2lnk_10');
  // require('./config/seedIcpc2lnk_11');
  // require('./config/seedIcpc2lnk_12');

  // require('./config/seedIcpc2trm');
  // require('./config/seedIcpc2trm_2');
  // require('./config/seedIcpc2trm_3');
  // require('./config/seedIcpc2trm_4');
  // require('./config/seedIcpc2trm_5');
  // require('./config/seedIcpc2trm_6');
  // require('./config/seedIcpc2trm_7');
  // require('./config/seedIcpc2trm_8');
  // require('./config/seedIcpc2trm_9');
  // require('./config/seedIcpc2trm_10');
  // require('./config/seedIcpc2trm_11');
  // require('./config/seedIcpc2trm_12');
  // require('./config/seedIcpc2trm_13');
  // require('./config/seedIcpc2trm_14');
  // require('./config/seedIcpc2trm_15');

}

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
