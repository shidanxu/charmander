var fs = require('fs');
var readline = require('readline');
var async = require('async');

var utils = {};

/*
  Send a 200 OK with success:true in the request body to the
  response argument provided.
  The caller of this function should return after calling
*/
utils.sendSuccessResponse = function(res, content) {
  res.status(200).json({
    success: true,
    content: content
  }).end();
};

/*
  Send an error code with success:false and error message
  as provided in the arguments to the response argument provided.
  The caller of this function should return after calling
*/
utils.sendErrResponse = function(res, errcode, err) {
  res.status(errcode).json({
    success: false,
    err: err
  }).end();
};




utils.upload = function(req, res, upload_name, cb) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    var server_fn = upload_name + filename;
    console.log("Uploading: " + server_fn);
    fstream = fs.createWriteStream(server_fn);
    file.pipe(fstream);
    fstream.on('close', function() {
      console.log("Done Upload");
      cb(res, server_fn);
    });
  });
};


utils.readCsvSync = function(filename, func_line) {
  var arrs = fs.readFileSync(filename).toString().split("\n");
  // remove header
  arrs.splice(0, 1);
  // remove tail
  if (arrs[arrs.length - 1] == "") {
    arrs.splice(arrs.length - 1, 1);
  }


  var calls = [];
  arrs.forEach(function(arr) {
    calls.push(function(cb) {
      func_line(arr, cb);
    });
  });
  async.series(calls, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(filename + " load successfully.");
    }
  });
}

utils.zip = function(arrayA, arrayB) {
  var length = Math.min(arrayA.length, arrayB.length);
  var result = [];
  for (var n = 0; n < length; n++) {
    result.push([arrayA[n], arrayB[n]]);
  }
  return result;
}
utils.getUrlParam = function(inputUrl, name) {
  var rx = new RegExp('[\&|\?]' + name + '=([^\&\#]+)'),
    val = inputUrl.match(rx);
  return !val ? '' : val[1];
}
module.exports = utils;
// Read in the image file as a binary string.
// reader.onloadend = function(evt) {
//   if (evt.target.readyState == FileReader.DONE) { // DONE == 2
//     // directly output 
//     //document.getElementById('byte_content').textContent = evt.target.result;
//     var csv = evt.target.result;
//     var data = $.csv.toArrays(csv, {
//       onParseValue: $.csv.hooks.castToScalar
//     });
//   }
// };
// }