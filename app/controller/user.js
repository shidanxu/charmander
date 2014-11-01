// Lead author: Shidan Xu

var Mongoose = require('mongoose');
var MFA = Mongoose.model('MFA');
var Artwork = Mongoose.model('Artwork');
var Gallery = Mongoose.model('Gallery');
var path = require('path');
var MyUtil = require(path.join(config.controllers_path, 'util'));
// -------------------------


/*
GET:
  /
Request parameters:
  null
Response: 
  success: true if this gallery is in database
  content: json file of the requested gallery
  err: error message
*/
// Show one artwork
exports.homepage = function(req, res) {
  res.render('/html/userhome.html');
};