'use strict';

var express = require('express');
var controller = require('./icpc2lnk.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/keyid/:id', auth.isAuthenticated(), controller.showLnkKey);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
