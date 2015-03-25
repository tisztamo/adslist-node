/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Ad = require('../api/ad/ad.model');

User.find({}).remove(function () {
  User.create({
    userId: 'admin',
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    userId: 'test',
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function () {
    console.log('finished populating users');
    var admin = User.findOne({
      name: 'Admin'
    }, function (err, admin) {
      Ad.find({}).remove(function () {
        Ad.create({
          creator: admin._id,
          text: 'This is the first ad',
          approved: true,
          rejected: false,
          createdOn: new Date()
        }, {
          creator: admin._id,
          text: 'Test Ad with <b>bold text</b>',
          approved: true,
          rejected: false,
          createdOn: Date.now()
        }, {
          creator: admin._id,
          text: 'This Ad is not acceptable',
          approved: false,
          rejected: false,
          createdOn: Date.now()
        }, function () {
          console.log('finished populating ads');
        });
      });
    })
  });
});