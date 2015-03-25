/*jslint node: true */
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ad = require('./ad.model');

function onSave(socket, doc, cb) {
  if (doc.approved) {
    Ad.findById(doc._id).populate('creator').exec(function (err, populatedAd) {
      socket.emit('ad:save', populatedAd);
    });
  }
}

function onRemove(socket, doc, cb) {
  socket.emit('ad:remove', doc);
}

exports.register = function (socket) {
  Ad.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ad.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};