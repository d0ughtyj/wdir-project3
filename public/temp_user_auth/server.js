// DEPENDENCIES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');

// CONFIG
var app = express();
var port = process.env.PORT || 3000;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_auth_app';

// DB
mongoose.connect(mongoURI);

// CONTROLLERS
var usersController = require('./controllers/usersController');

// MIDDLEWARE
app.use(morgan('dev'));

app.use(express.static('public'));

app.use(session({
  secret: 'brain_gremlin',
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersController);

// LISTENER
app.listen(port, function() {
	console.log('User Auth APP is running on port ' + port);
});
