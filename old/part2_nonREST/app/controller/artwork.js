var Mongoose = require('mongoose');
var MFA = Mongoose.model('MFA');
var Artwork = Mongoose.model('Artwork');
var path = require('path');
var MyUtil = require(path.join(config.controllers_path, 'util'));
// -------------------------
// 4. Internal debug
// GET methods
/*
GET:
  /mfa/artwork/{'new', 'show', 'del'}
Request parameters:
id: a string representation of the artwork ID
Response: 
success: true if the artwork is added
content: null
err: error message

*/
exports.mGet = function(req, res) {
  var artworkOpt = req.url.substring(req.url.indexOf('/artwork/') + 9);
  console.log("artworkopt: " + artworkOpt);
  switch (artworkOpt) {
    case "new":
      artworkNew(req, res);
      break;
    case "show":
      artworkShow(req, res);
      break;
    case "del":
      artworkDel(req, res);
      break;
    case "update":
      artworkUpdate(req,res);
      break;
    case "upload":
      artworkUpload(req,res);
      break;
  }
}
artworkDel = function(req, res) {
  Artwork.remove({}, function(err) {
    console.log('collection removed')
  });
  res.redirect('/mfa/artwork/new');
}
artworkNew = function(req, res) {
  console.log('new artwork')
  MyUtil.sendSuccessResponse(res, req.content);
  res.render('mfa/artwork/new');
}
artworkShow = function(req, res) {
  Artwork.find({}).exec(function(err, result) {
    res.render('mfa/artwork/show', {
      items: result
    });
  });
};
artworkUpload = function(req, res){
  console.log('upload artwork')
  res.render('mfa/artwork/upload');
}

artworkUpdate = function(req, res){
  console.log('update artwork')
  res.render('mfa/artwork/update');
}

// POST methods
exports.mCreate2 = function(req, res) {
    console.log("save: "+JSON.stringify(req.body));
}

exports.mCreate = function(req, res) {
    console.log("save: "+req.url);
  var newArtwork = new Artwork({
    //name now gets merged in the url
    "name": MyUtil.getUrlParam(req.url,"name"),
    "accessNumber": MyUtil.getUrlParam(req.url, "accessNumber")
  });
  newArtwork.save(function(err, result) {
    console.log("err: "+err);
    console.log("result: "+result);
    if (err){
      MyUtil.sendErrResponse(res, 500, err);
    }
    else{
      console.log(result + " success.");
      MyUtil.sendSuccessResponse(res, { artwork: result });
    }
  });
//  res.redirect('/mfa/artwork/new');
}

exports.mUpload = function(req, res) {
  // upload the file onto server: public/upload/
  MyUtil.upload(req, res, config.upload_path, function(res, server_fn) {
    // read each line 
    MyUtil.readcsv(server_fn,
      function(line) {
        // save into db
        // similar to controller/map.js
        // TODO: neil
        console.log(line);
      }
    );
  });
}



exports.mTest = function(req, res) {
  MyUtil.readcsv(config.upload_path + 'map.csv',
    function(line) {
      console.log(line);
    }
  );
}
