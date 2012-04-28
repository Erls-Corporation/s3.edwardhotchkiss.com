
/**
 * S3 Model
 */

require('express-mongoose');

var mongoose = require('mongoose')
  , Promise = mongoose.Promise
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var S3Schema = new Schema({
  id          : { type : ObjectId },
  hash        : { type : String },
  url         : { type : String },
  title       : { type : String },
  fileName    : { type : String },
  description : { type : String },
  created_at  : { type : Date, default: Date.now }
});

var S3 = module.exports = mongoose.model('S3', S3Schema);

S3.deleteAll = function() {
  S3.find({}, function(error, results) {
    results.map(function(result) {
      result.remove();
    });
  });
};

S3.findAll = function(callback) {
  var promise = new Promise();
  this.find().run(promise.resolve.bind(promise));
  return promise;
};

/* EOF */