console.log('app_user_auth.js');

//credits
//https://github.com/singular000/botch_app

(function() {

var app = angular.module('userAuth', []);

app.controller('userController', ['$http', '$timeout', function($http, $timeout) {

	var self = this;

	this.isFound = false;
	this.finding = false;
	this.requestError = null;
	this.user = {};
	this.loggedIn = false;
	this.loginError = null;

	//************************************************************//
	this.getUser = function(next) {
		console.log('get user.....');
		$http({ method: 'GET', url: '/users/loggedIn' }).then(function(response) {
			if (response.data.status == 200) {
				self.user = response.data.user;
				self.loggedIn = true;
				this.loginError = null;
				console.log('200: ' + response.data.message);
			} else {
				self.user = {};
				self.loggedIn = false;
			}
			return next();
		});
	};


	// this.getUser(function() {
	// 	console.log('Logged in User: ', this.user);
	// });

//*************************************************//
// jimd we need this function for user auth
		this.getUser(function() {
				if (self.loggedIn && self.user) {
							console.log('Form data: ', self.newPlayerForm);
							$http({
								method: 'POST',
								url: '/players',
								data: self.newPlayerForm
							}).then(function(result) {
								if (result.data.errors) {
									console.log('Error: ', result);
									self.newPlayerError = "Please enter all the info";
								} else {
									console.log('Created Player (201): ', result.data);
									console.log("THIS IS THIS: ", this);
									self.newPlayerForm = {};
									console.log('old players list: ', self.playersList);
									self.playersList.push(result.data);
								}
							}, function(serverError) {
								console.log(serverError);
							});
				} else {
					self.newPlayerError = "Log in to add a player";
				} // end user check
		}); // end getUser
	//} // end process new player


	//*************************************************//
	this.resetState = function() {
		// this.showSingleGame = false;
		document.body.scrollTop = 0;
	};

	//*************************************************//
	this.getNumber = function(num) {
		return new Array(num);
	};

//******************************************//
	this.register = function(userPass) {
		console.log(this.registerForm);
		$http({
			url: '/users',
			method: 'POST',
			data: this.registerForm
		}).then(function(response) {
			if (response.data.status == 201) {
				location.reload();
			} else {
				self.loginError = "Username already taken";
				self.registerForm = {};
			}
		});
	};

	//******************************************//
	this.login = function(userPass) {
		console.log(this.loginForm);
		$http({
			url: '/users/login',
			method: 'POST',
			data: this.loginForm
		}).then(function(response) {
			self.loginForm = {};
			if (response.data.status == 401) {
				self.loginError = response.data.message;
			} else {
				console.log('Logged in user: ', response.data);
				self.user = response.data.user;
				self.loggedIn = true;
				self.showRegistration = false;
				self.loginError =null;
			}
		});
	};

//******************************************//
	this.logout = function() {
		console.log('logging out...');
		$http({
			url: '/users/logout',
			method: 'POST'
		}).then(function(response) {
			location.reload();
		});
	};
//******************************************//


}]);

}());
