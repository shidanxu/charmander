var Mongoose = require('mongoose');
var MFA = Mongoose.model('MFA');
var Artwork = Mongoose.model('Artwork');
var path = require('path');
var MyUtil = require(path.join(config.controllers_path, 'util'));

// -------------------------
// 4. Internal debug
// show all user profiles
exports.show = function(req, res) {
  MFA.find({}).exec(function(err, result) {
    res.render('mfa/admin', {
      items: result
    });
  });
};
// delete all mfa
exports.artwork = function(req, res) {
  var artwork_option = req.url.substring(req.url.indexOf('/artwork/') + 9);
  console.log("opt: " + artwork_option);
  switch (artwork_option) {
    case "new":
      artwork_new(req, res);
      break;
    case "show":
      artwork_show(req, res);
      break;
    case "del":
      artwork_del(req, res);
      break;
  }
}


exports.artwork_create = function(req, res) {
  var newArtwork = new Artwork({
    "name": req.body.artworkName,
    "accessNumber": req.body.artworkAccessNumber
  });
  newArtwork.save(function(err, result) {});
  res.redirect('/mfa/artwork/new');
}

exports.artwork_upload = function(req, res) {
  MyUtil.upload(req,res,config.upload_path,'/mfa/artwork/new');
}

artwork_del = function(req, res) {
  Artwork.remove({}, function(err) {
    console.log('collection removed')
  });
  res.redirect('/mfa/artwork/new');
}

artwork_new = function(req, res) {
  res.render('mfa/artwork/new');
}
artwork_show = function(req, res) {
  Artwork.find({}).exec(function(err, result) {
    res.render('mfa/artwork/show', {
      items: result
    });
  });
};

// delete all mfa
exports.del = function(req, res) {
  MFA.remove({}, function(err) {
    console.log('collection removed')
  });
  res.redirect('/');
}