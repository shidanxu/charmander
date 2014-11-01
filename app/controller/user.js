// Lead author: Shidan Xu


var path = require('path');
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
  res.render('userhome.ejs');
};