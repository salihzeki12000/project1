/**
 * Icpc2key model events
 */

'use strict';

import {EventEmitter} from 'events';
var Icpc2key = require('./icpc2key.model');
var Icpc2keyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Icpc2keyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Icpc2key.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Icpc2keyEvents.emit(event + ':' + doc._id, doc);
    Icpc2keyEvents.emit(event, doc);
  }
}

export default Icpc2keyEvents;
