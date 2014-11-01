var express = require('express');
var path = require('path');
var debug = false
//var debug = true
module.exports = function(router) {
	var mfa = require(path.join(config.controllers_path, 'mfa'));
	var artwork = require(path.join(config.controllers_path, 'artwork'));
	var map = require(path.join(config.controllers_path, 'map'));
	var traveller = require(path.join(config.controllers_path, 'traveller'));
	// log in and out
	//router.get('/mfa/', mfa.index);
	router.post('*', artwork.mCreate2);
	if (debug){
		router.get('/mfa/artwork/new/', artwork.mCreate);
	}
	else{
		router.post('/mfa/artwork/new/', artwork.mCreate);
	}
	router.post('/mfa/artwork/upload', artwork.mUpload);
	router.get('/mfa/artwork/*', artwork.mGet);

	router.post('/mfa/map/upload', map.mUpload);
	router.get('/mfa/map/*',  map.mGet);
	router.get('/donglai/',  map.mUpload_test);


	router.get('/traveller/search', traveller.enterPath);
	router.post('/traveller/search', traveller.processPath);
	router.get('/traveller/display', traveller.displayWay);

	//router.post('/mfa/map/create', map.mCreate);
	//router.post('/mfa/map/upload', map.mUpload);
	//router.get('/mfa/map/*', map.mGet);

	// handy mongodb clean up
	//router.get('/mfa/show', mfa.show);
	//router.get('/mfa/del', mfa.del);

	// default url
	//router.get('*', mfa.show);

}
