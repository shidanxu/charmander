var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var NodeSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: true,
    unique: true
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
});
Mongoose.model('Node', NodeSchema);

var EdgeSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: true,
    unique: true
  },
  node1: {
    type: Schema.ObjectId,
    ref: 'Node'
  },
  node2: {
    type: Schema.ObjectId,
    ref: 'Node'
  },
  paths: [{
    type: Number
  }],
  dist: {
    type: Number,
    default: 0
  }
});
Mongoose.model('Edge', EdgeSchema);

var WaySchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  edges: [{
    type: Schema.ObjectId,
    ref: 'Edge'
  }]
});

var Edge = Mongoose.model('Edge');
WaySchema.methods = {
  listEdges: function(cb) {
    console.log("list edge: "+this.edges);
    Edge.find({
      '_id': {
        $in: this.edges
      }
    }).populate('node1')
      .populate('node2')
      .exec(cb);
  },
  edgesOut: function(edges,cb){
    var edge_list=[];    
    for(var i=0;i<edges.length;i++){
      edge_list.push([edges[i].node1.x,edges[i].node1.y,edges[i].node2.x,edges[i].node2.y]);
    }
    cb(edge_list);
  }
};

Mongoose.model('Way', WaySchema);