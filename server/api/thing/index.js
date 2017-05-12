'use strict';

var express = require('express');
var controller = require('./thing.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.get('/owner/:owner',auth.isAuthenticated(), controller.indexOwner);

router.get('/last/form', auth.isAuthenticated(), controller.showLast);
router.get('/lastformowner/:owner', auth.isAuthenticated(), controller.showLastFormOwner);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(),  controller.update);
router.patch('/:id',auth.isAuthenticated(),  controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
