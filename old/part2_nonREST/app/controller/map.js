var Mongoose = require('mongoose');
//var MFA = Mongoose.model('MFA');
var Map = Mongoose.model('Map');

var path = require('path');
var MyUtil = require(path.join(config.controllers_path, 'util'));
var MyGraph = require(path.join(config.controllers_path, 'graph'));
// -------------------------
// 4. Internal debug
// GET methods
exports.mGet = function(req, res) {
  var mapOpt0 = req.url.substring(req.url.indexOf('/map/') + 5);
  var mapOpt = mapOpt0;
  var param_index = mapOpt0.indexOf('?');
  if (param_index > -1) mapOpt = mapOpt.substring(0, param_index);

  console.log("opt: " + mapOpt);
  switch (mapOpt) {
    case "new":
      mapNew(req, res);
      break;
    case "show":
      mapShow(req, res);
      break;
    case "del_node":
    case "del_edge":
    case "del_all":
      mapDel(req, res, MyUtil.getUrlParam(mapOpt0, 'name'), mapOpt);
      break;
  }
}
mapDel = function(req, res, map_name, map_opt) {
  Map.findOne({
    name: map_name
  }, function(err, map) {
    switch (map_opt) {
      case "del_node":
        map.delAllNodes();
        break;
      case "del_edge":
        map.delAllEdges();
        break;
      case "del_all":
        map.delAllNodes();
        map.delAllEdges();
        break;
    }
    res.redirect('/mfa/map/show');
  });
}
mapNew = function(req, res) {
  res.render('mfa/map/new');
}
mapShow = function(req, res) {
  Map.findOne({})
    .populate('nodes')
    .populate('edges')
    .exec(function(err, result) {
      if (err) res.send(err);
      if (result) {
        res.render('mfa/map/show', {
          map_name: result.name,
          nodes: result.nodes,
          edges: result.edges
        });
      }
    });
};

// POST methods
exports.mCreate = function(req, res) {
  var newmap = new map({
    "name": req.body.mapName,
    "accessNumber": req.body.mapAccessNumber
  });
  newMap.save(function(err, result) {});
  res.redirect('/mfa/map/new');
};

exports.mUpload = function(req, res) {
  console.log("map upload");
  // upload the file onto server: public/upload/
  MyUtil.upload(req, res, config.upload_path, function(res, server_fn) {
    // read each line 
    MyUtil.readCsvSync(server_fn,
      function(line,cb) {
        // save into db
        console.log("read: " + line);
        var line_seg = line.split(",");
        Map.findOne({
          name: res[1]
        }).exec(function(err, result) {
          var map_ref;
          if (result == null) {
            // need to create
            console.log("create the map");
            map_ref = new Map({
              name: line_seg[1]
            });
          } else {
            map_ref = new Map(result);
          }
          switch (line_seg[0]) {
            case "0":
              MyGraph.mAddcvs(line_seg, function(new_id) {
                map_ref.addNode(new_id,cb(null));
              });
              break;
            case "1":
              MyGraph.mAddcvs(line_seg, function(new_id) {
                map_ref.addEdge(new_id,cb(null));
              });
              break;
          }

        });
      });
    res.redirect('/mfa/map/new');
  });
};
exports.mUpload_test = function(req, res) {
  server_fn = path.join(config.public_path,"/csv/map.csv");
    // read each line 
    MyUtil.readCsvSync(server_fn,
      function(line, cb) {
        // save into db
        console.log("read: " + line);
        var line_seg = line.split(",");
        Map.findOne({
          name: line_seg[1]
        }).exec(function(err, map_ref) {
          if (map_ref == null) {
            // need to create
            console.log("create the map");
            map_ref = new Map({
              name: line_seg[1]
            });
          }
          
          switch (line_seg[0]) {
            case "0":
              MyGraph.mAddcvs(line_seg, function(new_id) {
                map_ref.addNode(new_id,cb);
              });
              break;
            case "1":
              MyGraph.mAddcvs(line_seg, function(new_id) {
                map_ref.addEdge(new_id,cb);
              });
              break;
          }

        });
      });
    //res.redirect('/mfa/map/new');
};