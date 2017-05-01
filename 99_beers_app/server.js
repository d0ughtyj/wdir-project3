var express=require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

var beersController = require('./controllers/beers.js');
var seedController = require('./controllers/seeds.js');


app.use('/beers', beersController);
app.use('/seed', seedController);


mongoose.connect('mongodb://localhost:27017/beers');

mongoose.connection.once('open', function(){
  console.log('connected to mongo...');
});

app.listen(3000, function(){
  console.log('listening...');
});
