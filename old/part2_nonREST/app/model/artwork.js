var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// ## Define MFASchema
// non-empty and uniqueness requirement
var ArtworkSchema = new Schema({
  accessNumber: {type:String, default : '', trim : true, required:true, unique:true},
  name: {type:String, default : '', required:true}
});

ArtworkSchema.statics = {
 // Check Uniqueness
  load: function (user, cb) {
    this.findOne(user)
      .exec(cb);
  }
}

Mongoose.model('Artwork', ArtworkSchema);
