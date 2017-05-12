/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/icpc2keys              ->  index
 * POST    /api/icpc2keys              ->  create
 * GET     /api/icpc2keys/:id          ->  show
 * PUT     /api/icpc2keys/:id          ->  update
 * DELETE  /api/icpc2keys/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Icpc2key from './icpc2key.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.assign(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Icpc2keys
export function index(req, res) {
  Icpc2key.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Icpc2keys
export function showKeyword(req, res) {
  var value = req.params.keyword;  
  var regex = '^'+value;
  //console.log('regex',regex);
  Icpc2key.findAsync({keyword:{$regex:regex,$options:'i'}})//i:case insensitive
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a counter of Icpc2keys
export function showKeywordCounter(req, res) {
  var value = req.params.keyword;  
  var regex = '^'+value;
  // console.log('regex',regex);
  Icpc2key.find({keyword:{$regex:regex,$options:'i'}}).limit(1)
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Icpc2key from the DB
export function show(req, res) {
  Icpc2key.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Icpc2key in the DB
export function create(req, res) {
  Icpc2key.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Icpc2key in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Icpc2key.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Icpc2key from the DB
export function destroy(req, res) {
  Icpc2key.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
