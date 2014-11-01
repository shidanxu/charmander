// TODO for part 3
// var Mongoose = require('mongoose');
// var Schema = Mongoose.Schema;

// // ## Define MFASchema
// // non-empty and uniqueness requirement
// var MFASchema = new Schema({
//   username: {type:String, default : '', trim : true, required:true, unique:true},
//   password: {type:String, default : '', required:true},
//   followers: [{ type: Schema.Types.ObjectId, ref: 'MFA'}],
//   followings: [{ type: Schema.Types.ObjectId, ref: 'MFA'}]
// });

// MFASchema.statics = {
//  // Check Uniqueness
//   load: function (user, cb) {
//     this.findOne(user)
//       .exec(cb);
//   }
// }
// Mongoose.model('MFA', MFASchema);
