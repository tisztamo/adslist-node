/*globals handleError*/
/*jslint node: true, nomen: true */
'use strict';

var _ = require('lodash');
var Ad = require('./ad.model');
var auth = require('../../auth/auth.service');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');
var sanitizeHtml = require('sanitize-html');

// Get list of ads
exports.index = function (req, res) {
  Ad.find(req.query).populate('creator', 'userId name').exec(function (err, ads) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, ads);
  });
};

// Get a single ad
exports.show = function (req, res) {
  Ad.findById(req.params.id).populate('creator', 'userId name').exec(function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }
    return res.json(ad);
  });
};

exports.create = function (req, res) {
  var raw = req.body;
  if (!auth.hasRole(req.user, 'admin')) {
    raw.approved = false;
    raw.status = 'waitingforreview';
  }
  console.log(req.user);
  raw.creator = req.user.id;
  raw.createdOn = Date.now();
  raw.rejected = false;
  raw.text = clean(raw.text);
  Ad.create(raw, function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    Ad.findById(ad._id).populate('creator', 'userId name').exec(function (err, populatedAd) {
      return res.json(201, populatedAd);
    });
  });
};

// Updates an existing ad in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (typeof req.body.creator === "object" && req.body.creator._id) {
    req.body.creator = req.body.creator._id;
  }
  Ad.findById(req.params.id, function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }

    // Do not allow editing while in review - except for admins
    if (ad.status === "inreview" && auth.hasRole(req.user, "admin") !== true) {
      console.log("400");
      return res.send(400);
    }
    
    req.body.text = clean(req.body.text);

    var updated = _.merge(ad, req.body);
    //Only admins can change the approved flag, normal edits end in unapproved state
    if (!auth.hasRole(req.user, 'admin') && !req.body.approved) {
      updated.status = "waitingforreview";
      updated.approved = false;
      updated.rejected = false;
    }
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, ad);
    });
  });
};

// Deletes a ad from the DB.
exports.destroy = function (req, res) {
  Ad.findById(req.params.id, function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }
    ad.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.publish = function (req, res) {
  Ad.findById(req.params.id, function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }
    if (!ad.published) {
      ad.published = true;
      ad.token = jwt.sign({
        id: ad._id
      }, config.secrets.publication);
    }
    ad.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(200, ad.token);
    });
  });
};

exports.review = function (req, res) {
  Ad.findById(req.params.id).populate('creator', 'userId name').exec(function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }
    ad.status = "reviewed";
    ad.approved = req.body.approved;
    ad.rejected = !req.body.approved;
    ad.save();
    
    return res.json(200, ad);
  });
};

exports.public = function (req, res) {
  Ad.findById(req.params.id).populate('creator', 'userId name').exec(function (err, ad) {
    if (err) {
      return handleError(res, err);
    }
    if (!ad) {
      return res.send(404);
    }
    jwt.verify(req.query.token, config.secrets.publication, function (err, decoded) {
      if (err) {
        return res.send(403, "Invalid token: " + req.query.token);
      }
      if (decoded.id !== ad._id.toString()) {
        console.log(decoded);
        console.log(ad);
        return res.send(403, "Invalid id in token");
      }
      return res.json(200, ad);
    });
  });
};

function clean(dirty) {
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  });
}

function handleError(res, err) {
  return res.send(500, err);
}