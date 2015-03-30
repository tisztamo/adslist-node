/*jslint node: true*/
'use strict';

var express = require('express');
var controller = require('./ad.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id', auth.isAuthenticated(), controller.update);
router.post('/:id/review', auth.hasRole('admin'), controller.review);
router.post('/:id/token', auth.isAuthenticated(), controller.publish);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/public/:id', controller.public);

module.exports = router;