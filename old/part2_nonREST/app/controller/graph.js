var Mongoose = require('mongoose');
var Node = Mongoose.model('Node');
var Edge = Mongoose.model('Edge');

var path = require('path');
var MyUtil = require(path.join(config.controllers_path, 'util'));
// -------------------------
// 4. Internal debug
// GET methods
// 
exports.mGet = function(req, res) {
  var mapOpt = req.url.substring(req.url.indexOf('/map/') + 5);
  console.log("opt: " + mapOpt);
  switch (mapOpt) {
    case "new":
      mapNew(req, res);
      break;
    case "show":
      mapShow(req, res);
      break;
    case "del":
      mapDel(req, res);
      break;
  }
}
graphDel = function(req, res) {
  Map.remove({}, function(err) {
    console.log('collection removed')
  });
  res.redirect('/mfa/map/new');
}
graphNew = function(req, res) {
  res.render('mfa/map/new');
}
graphShow = function(req, res) {
  Map.find({}).exec(function(err, result) {
    res.render('mfa/map/show', {
      nodes: result.nodes,
      edges: result.edges
    });
  });
};

exports.mAddNode = function(input, cb) {
  var newNode = new Node(input);
  newNode.save(function(err) {
    if (err) {
      console.log("Can't add the node: " + err);
    } else {
      console.log("add node: " + newNode.name);
      cb(newNode._id);
    }
  });
};
exports.mAddEdgeById = function(input, cb) {
  var newEdge = Edge(input);
  newEdge.save(function(err) {
    if (err) {
      console.log("Can't add the edge: " + err);
    } else {
      console.log("add edge: " + newEdge.name);
      cb(newEdge._id);
    }
  });
};
exports.mFindEdgeByName = function(input, cb) {
   console.log("find edge: "+input);
  Edge.findOne({
      $or: [{
        'name': input[0] + "_" + input[1]
      }, {
        'name': input[1] + "_" + input[0]
      }]
    },
    function(err, result) {
      if (result) {
        cb(result._id);
      } else {
        console.log("no edge found");
      }
    });
};
exports.mAddEdgeByName = function(input, cb) {
  //console.log("yo: " + input.node1 + "_" + input.node2);
  Node.find({
      $or: [{
        'name': input.node1
      }, {
        'name': input.node2
      }]
    },
    function(err, results) {
      if (err || results.length != 2) {
        console.log("err: " + err);
        console.log("result: " + results);
        console.log("Can't find both Nodes " + input.node1 + " " + input.node2);
      } else {
        if (results[0].name == input.node1) {
          input.node1 = results[0]._id;
          input.node2 = results[1]._id;
        } else {
          input.node1 = results[1]._id;
          input.node2 = results[0]._id;
        }
        //console.log("add edge:"+input);
        module.exports.mAddEdgeById(input, cb);
      }
    });
}


exports.mAddcvs = function(csv_inputs, cb) {
  switch (csv_inputs[0]) {
    case "0":
      // add Node
      module.exports.mAddNode({
        name: csv_inputs[2],
        x: parseFloat(csv_inputs[3]),
        y: parseFloat(csv_inputs[4])
      }, cb);
      break;
    case "1":
      // add Edge
      var tmp_node = csv_inputs[2].split("_");
      module.exports.mAddEdgeByName({
        name: csv_inputs[2],
        node1: tmp_node[0],
        node2: tmp_node[1],
        dist: parseFloat(csv_inputs[5])
      }, cb);
      break;
  }
};
// POST methods
exports.mCreate = function(req, res) {
  var newmap = new map({
    "name": req.body.mapName,
    "accessNumber": req.body.mapAccessNumber
  });
  newMap.save(function(err, result) {});
  res.redirect('/mfa/map/new');
}