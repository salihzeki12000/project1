/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/drugs              ->  index
 * POST    /api/drugs              ->  create
 * GET     /api/drugs/:id          ->  show
 * PUT     /api/drugs/:id          ->  update
 * DELETE  /api/drugs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Drug from './drug.model';

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

// Gets a list of Drugs
export function index(req, res) {
  Drug.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Drug from the DB
export function show(req, res) {
  Drug.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Drug in the DB
export function create(req, res) {
  Drug.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Drug in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Drug.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Drug from the DB
export function destroy(req, res) {
  Drug.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
