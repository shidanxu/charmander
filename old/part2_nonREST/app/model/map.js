var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Node = Mongoose.model('Node');
var Edge = Mongoose.model('Edge');

var MapSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: true,
		unique: true
	},
	description: {
		type: String,
		default: ''
	},
	image: {
		data: Buffer,
		contentType: String
	},
	nodes: [{
		type: Schema.ObjectId,
		ref: 'Node'
	}],
	edges: [{
		type: Schema.ObjectId,
		ref: 'Edge'
	}]
});

MapSchema.methods = {
	delNode: function(del_id) {
		var index = this.nodes.indexOf(del_id);
		if (index > -1) {
			this.nodes.splice(index, 1);
			Node.findByIdAndRemove(del_id, function(err) {
				if (err) console.log(err);
			});
		}
	},
	delEdge: function(del_id) {
		var index = this.edges.indexOf(del_id);
		if (index > -1) {
			this.edges.splice(index, 1);
			Edge.findByIdAndRemove(del_id, function(err) {
				if (err) console.log(err);
			});
		}
	},
	delAllNodes: function() {
		Node.find({
			_id: {
				$in: this.nodes
			}
		}, function(err, results) {
			results.forEach(function(result) {
				console.log("rm: " + result._id);
				Node.findByIdAndRemove(result._id, function(err) {
					if (err) console.log(err);
				});
			});
		});
		this.nodes = [];
	},
	delAllEdges: function(del_id) {
		Edge.find({
			_id: {
				$in: this.edges
			}
		}, function(err, results) {
			results.forEach(function(result) {
				Edge.findByIdAndRemove(result._id, function(err) {
					if (err) console.log(err);
				});
			});
		});
		this.edges = [];
	},
	addNode: function(new_id,cb) {
		this.nodes.push(new_id);
		this.save(cb);
	},
	addEdge: function(new_id,cb) {
		this.edges.push(new_id);
		this.save(cb);
	},
};

Mongoose.model('Map', MapSchema);