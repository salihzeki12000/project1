/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/icpc2trms              ->  index
 * POST    /api/icpc2trms              ->  create
 * GET     /api/icpc2trms/:id          ->  show
 * PUT     /api/icpc2trms/:id          ->  update
 * DELETE  /api/icpc2trms/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Icpc2trm from './icpc2trm.model';

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

// Gets a list of Icpc2trms
export function index(req, res) {
  Icpc2trm.findAsync({status:{$ne:"I"}})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Icpc2trm from the DB
export function show(req, res) {
  Icpc2trm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Icpc2trm in the DB
export function create(req, res) {
  Icpc2trm.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Icpc2trm in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Icpc2trm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Icpc2trm from the DB
export function destroy(req, res) {
  Icpc2trm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
