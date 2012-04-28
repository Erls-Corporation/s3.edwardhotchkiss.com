
/**
 * S3 Model
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var S3Schema = new Schema({
  id          : { type : ObjectId },
  hash        : { type : String },
  url 		    : { type : String },
  title       : { type : String },
  description : { type : String },
  created_at  : { type : Date, default: Date.now }
});

var S3 = module.exports = mongoose.model('S3', S3Schema);

/* EOF */