/**
 * Icpc2lnk model events
 */

'use strict';

import {EventEmitter} from 'events';
var Icpc2lnk = require('./icpc2lnk.model');
var Icpc2lnkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Icpc2lnkEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Icpc2lnk.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    Icpc2lnkEvents.emit(event + ':' + doc._id, doc);
    Icpc2lnkEvents.emit(event, doc);
  }
}

export default Icpc2lnkEvents;
