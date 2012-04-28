
var fs = require('fs')
  , util = require('util')
  , path = require('path')
  , knox = require('knox')
  , uuid = require('node-uuid')
  , formidable = require('formidable')
  , S3 = require('../models/S3');

/**
 * AWS Client
 */

var client = knox.createClient({
  key:    'AKIAJW5OBAPB6ZYIED2A',
  secret: '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',
  bucket: 'edwardhhotchkiss'
});

/**
 * Routes
 */

module.exports = function(app) {
  
  app.get('/', function(request, response) {
    S3.find({}, function(error, results) {
      if (error) {
        throw new Error(errror);
      } else {
        response.render('index', {
          locals : {
            images : results
          }
        });
      }
    });
  });

  app.get('/upload', function(request, response) {
    response.render('upload');
  });

  app.post('/upload', function(request, response) {
    var ext
      , hash
      , form = new formidable.IncomingForm()
      , files = []
      , fields = [];
    form.keepExtensions = true;
    form.uploadDir = 'tmp';
    form.on('fileBegin', function(name, file) {
      ext = file.path.split('.')[1];
      hash = uuid.v1();
      file.path = form.uploadDir + '/' + hash;
    });
    form.on('field', function(field, value) {
      fields.push([field, value]);
    }).on('file', function(field, file) {
      files.push([field, file]);
    }).on('end', function() {
      fs.readFile(__dirname + '/../tmp/' + hash, function(error, buf) {
        var req = client.put('/images/' + hash + '.png', {
          'x-amz-acl': 'private',
          'Content-Length': buf.length,
          'Content-Type': 'image/png'
        });
        req.on('response', function(res){
          var image = new S3({
            hash : hash,
            url : req.url
          });
          image.save(function(error, result) {
            if (error) {
              throw new Error(error);
            } else {
              response.redirect('http://' + request.headers.host + '/' + hash);
            };
          })
        });
        req.end(buf);
      });
    });
    form.parse(request);
  });

  app.get('/:hash', function(request, response) {
    S3.findOne({ hash : request.params.hash }, function(error, result) {
      if (error) {
        console.error(error);
      } else {
        client.get('/images/' + request.params.hash + '.png').on('response', function(_response){
          if (_response.statusCode === 200) {
            util.pump(_response, response);
          } else {
            response.redirect('/', 404);
          }
        }).end();
      }
    });
  });

};

/* EOF */