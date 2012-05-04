var express = require('express')
  , mongoose = require('mongoose')
  , app = express.createServer();

/**
 * connect to mongo
 */

var MONGO_DB = 'mongodb://nodejitsu:4fa7cfa95d15248bc28946e40f40d138@staff.mongohq.com:10069/nodejitsudb446502278283';

mongoose.connect(MONGO_DB);

mongoose.connection.on('error', function(error) {
  throw new Error(error);  
});

/**
 * Setup ExpressJS
 */

app.configure(function() {
  app.use(express.static(__dirname+'/public'));
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
});

/**
 * Routes
 */

require('./controllers/s3')(app);

/**
 * ExpressJS, Listen on <port>
 */

app.listen(8000, function() {
  console.log('server running on port 8000');
});

/* EOF */