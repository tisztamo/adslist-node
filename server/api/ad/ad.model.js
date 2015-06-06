/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    auth = require('../../auth/auth.service');

var AdSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  createdOn: Date,
  approved: Boolean,
  rejected: Boolean,
  status: String,
  published: Boolean,
  token: String
});

AdSchema.methods.hasAccess = function (user) {
  return auth.hasAdAccess(user, this);
};

module.exports = mongoose.model('Ad', AdSchema);