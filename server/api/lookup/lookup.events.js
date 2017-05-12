/**
 * Lookup model events
 */

'use strict';

import {EventEmitter} from 'events';
var Lookup = require('./lookup.model');
var LookupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LookupEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Lookup.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LookupEvents.emit(event + ':' + doc._id, doc);
    LookupEvents.emit(event, doc);
  }
}

export default LookupEvents;
