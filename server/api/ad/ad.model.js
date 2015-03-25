/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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

module.exports = mongoose.model('Ad', AdSchema);