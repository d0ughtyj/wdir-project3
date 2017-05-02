var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Beers = require('../models/beers');


// index
router.get('/', function(req, res) {
	User.find(function(err, users) {
		if (err) throw err;
		res.json(users);
	});
});

router.get('/loggedIn', function(req, res) {
	if (!req.session.loggedInUser) {
		res.json({ status: 404, message: 'No user logged in' });
	} else {
		User.findOne({ username: req.session.loggedInUser.username }, function(err, foundUser) {
			 res.json({ status: 200, user: foundUser });
		});
	}
});

// create
router.post('/', function(req, res) {
	User.create(req.body, function(err, user) {
		if (err) {
			res.json({ status: 422, error: err });
		} else {
			req.session.loggedInUser = { username: user.username, id: user.id }
			res.json({ status: 201, user: user });
		}
	});
});



// authenticate
router.post('/login', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, foundUser) {
		if (!foundUser) {
			console.log('no user found');
			res.json({ status: 401, message: 'Username not found' });
		} else if (foundUser.authenticate(req.body.password)) {
			req.session.loggedInUser = { username: foundUser.username, id: foundUser.id }
			res.json({ status: 200, user: foundUser, message: null });
		} else {
			console.log('password does not match');
			res.json({ status: 401, message: 'Wrong password' });
		}
	});
});

router.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		res.json({ status: 204 });
	});
});

router.post('/:id', function(req, res) {
	console.log(req.session.loggedInUser);
	User.findById(req.session.loggedInUser.id, function(err, foundUser){
			Beers.findById(req.params.id, function(err, foundBeer){
				foundUser.favoriteBeers.push(foundBeer);
				foundUser.save(function(err, savedUser){
					res.json({ status: 200 });
				});
			});
		});
});

module.exports = router;
