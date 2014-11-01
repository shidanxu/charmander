var path = require('path');
config = require(path.join(__dirname,'config','config'));
// library settings
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

// build app
var app = express();
// models settings

fs.readdirSync(config.models_path).forEach(function(file) {
    require(path.join(config.models_path,file));
});
// model dependency
// require(path.join(config.models_path,"artwork"));
// require(path.join(config.models_path,"graph"));
// require(path.join(config.models_path,"map"));
// require(path.join(config.models_path,"mfa"));
console.log("Done: register");
// express settings
require(path.join(__dirname,'config','express'))(app);
// routes settings
require(path.join(__dirname,'config','routes'))(app);

// Start the app by listening on port
app.set('port', process.env.PORT || 3000);
var debug = require('debug')('app');
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
