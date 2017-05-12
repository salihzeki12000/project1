/**
 * Icpc2trm model events
 */

'use strict';

import {EventEmitter} from 'events';
var Icpc2trm = require('./icpc2trm.model');
var Icpc2trmEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Icpc2trmEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Icpc2trm.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Icpc2trmEvents.emit(event + ':' + doc._id, doc);
    Icpc2trmEvents.emit(event, doc);
  }
}

export default Icpc2trmEvents;
