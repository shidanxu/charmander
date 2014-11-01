var Mongoose = require('mongoose');
var MFA = Mongoose.model('MFA');
var Map = Mongoose.model('Map');
var Node = Mongoose.model('Node');
var Edge = Mongoose.model('Edge');
var Way = Mongoose.model('Way');
var path = require('path');
var MyGraph = require(path.join(config.controllers_path, 'graph'));
var MyUtil = require(path.join(config.controllers_path, 'util'));
var async = require('async');

exports.enterPath = function(req, res) {
	console.log("path");
	res.render('traveller/search');
}

exports.processPath_toy = function(req, res) {
	// Shidan's version to create the nodes/edges/ways on the fly
	console.log("processing path");

	var arrayOfArtworks = req.body.artworks.split(",");
	var edge_pairs = MyUtil.zip(arrayOfArtworks.slice(0, arrayOfArtworks.length),
		arrayOfArtworks.slice(1, arrayOfArtworks.length + 1));
	console.log(edge_pairs);

	var map_name = "floor3";
	Map.findOne({
		name: map_name
	}).exec(function(err, result) {
		var map_ref;
		if (result == null) {
			// need to create
			console.log("create the map");
			map_ref = new Map({
				name: map_name
			});
		} else {
			map_ref = new Map(result);
		}
		// prepare dependent async jobs
		var call_nodes = [];
		var call_edges = [];
		arrayOfArtworks.forEach(function(artwork, ii) {
			call_nodes.push(function(cb) {
				MyGraph.mAddNode({
					"name": artwork.trim(),
					"x": ii * 100,
					"y": ii * 100 + Math.round(Math.random() * 100)
				}, function(new_id) {
					map_ref.addNode(new_id);
					cb(null);
				});
			});
		});
		edge_pairs.forEach(function(edge_pair) {
			call_edges.push(function(cb) {
				MyGraph.mAddEdgeByName({
					"name": edge_pair[0] + "_" + edge_pair[1],
					"node1": edge_pair[0],
					"node2": edge_pair[1]
				}, function(new_id) {
					map_ref.addEdge(new_id);
					cb(null);
				});
			});
		});
		// async within nodes/edges insert
		async.series([
			function(cb) {
				async.parallel(call_nodes, cb);
			},
			function(cb) {
				async.parallel(call_edges, cb);
			}
		], function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("map: " + map_name + ", saved nodes: " + map_ref.nodes);
				console.log("map: " + map_name + ", saved edges: " + map_ref.edges);
				//process edges into way
				way = new Way({
					"name": "dummy",
					"edges": map_ref.edges
				});
				way.save(function(err) {
					console.log("save way: "+way.name);
					res.redirect('display');
					//res.redirect('search');
				});
			}
		});
	});
};

exports.processPath = function(req, res) {
	console.log("processing path");

	var arrayOfArtworks = req.body.artworks.split(",");
	var edge_pairs = MyUtil.zip(arrayOfArtworks.slice(0, arrayOfArtworks.length),
		arrayOfArtworks.slice(1, arrayOfArtworks.length + 1));
	console.log(edge_pairs);

	var map_name = "floor3";
	Map.findOne({
		name: map_name
	}).exec(function(err, result) {
		var map_ref;
		if (result == null) {
			// need to create
			console.log("create the map");
			map_ref = new Map({
				name: map_name
			});
		} else {
			map_ref = new Map(result);
		}
		// prepare dependent async jobs
		
		var call_edges = [];
		var way_edges = [];
		edge_pairs.forEach(function(edge_pair) {
			call_edges.push(function(cb) {
				MyGraph.mFindEdgeByName(
					edge_pair,function(new_id) {
					way_edges.push(new_id);
					cb(null);
				});
			});
		});
		// async within nodes/edges insert
		async.series([
			function(cb) {
				async.parallel(call_edges, cb);
			}
		], function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("way edges: "+way_edges);
				//process edges into way
				way = new Way({
					"edges": way_edges
				});
				way.save(function(err) {
					console.log("save a way with "+way.edges.length+" edges");
					res.redirect('display?way='+way._id);
					//res.redirect('search');
				});
			}
		});
	});
};

exports.displayWay = function(req, res) {
	// find the way
	var way_id = MyUtil.getUrlParam(req.url, 'way');
	Way.findById(way_id)
	.exec(function(err, result) {
		//display all populated edges
		if(err) res.send("can't find the way");
		if(result){
		result.listEdges(function(err, edges) {
			result.edgesOut(edges, function(edge_list) {
				console.log("populated edges:" + edge_list);
				res.render('traveller/display', {
					wayName: result.name,
					wayEdges: edge_list
				});
			});
		});
		}else{
			console.log("way is null...");
		}
	});
}