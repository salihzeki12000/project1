/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lookups              ->  index
 * POST    /api/lookups              ->  create
 * GET     /api/lookups/:id          ->  show
 * PUT     /api/lookups/:id          ->  update
 * DELETE  /api/lookups/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Lookup from './lookup.model';

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

// Gets a list of Lookups
export function index(req, res) {
  Lookup.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Lookup from the DB
export function show(req, res) {
  Lookup.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a linkKeyword
export function showLinkKey(req, res) {
  var regex = req.params.keyword;  
  // console.log('regex',regex);
  Lookup.findAsync({linkeyword:{$regex:regex,$options:'i'}})//i:case insensitive
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Lookup in the DB
export function create(req, res) {
  Lookup.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Lookup in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Lookup.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Lookup from the DB
export function destroy(req, res) {
  Lookup.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}