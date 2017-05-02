var app = angular.module('BeersApp', ['rzModule']);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
  var controller = this;
  this.swapper = 0;
  $scope.ibuMinFilter = 0;
  $scope.value = "10";

  $scope.ibuSlider = {
    min: 0,
    max: 120,
    options: {
      floor: 0,
      ceil: 120
    }
  };

  $scope.abvSlider = {
    min: 0,
    max: 15,
    options: {
      floor: 0,
      ceil: 15
    }
  };

  $scope.srmSlider = {
    min: 1,
    max: 40,
    options: {
      floor: 1,
      ceil: 40,
      pushRange: true
    }
  };

this.next = function(){
  this.swapper++;
};

this.prev = function() {
  this.swapper --;
};

this.getColor = function(srmColor){
  if(srmColor===1){
    return("#F3F993");
  }else if(srmColor===2){
      return("#F5F75C");
  }else if(srmColor===3){
      return("#F6F513");
  }else if(srmColor===4){
      return("#EAE615");
  }else if(srmColor===5){
      return("#E0D01B");
  }else if(srmColor===6){
      return("#D5BC26");
  }else if(srmColor===7){
      return("#CDAA37");
  }else if(srmColor===8){
      return("#C1963C");
  }else if(srmColor===9){
      return("#BE8C3A");
  }else if(srmColor===10){
      return("#BE823A");
  }else if(srmColor===11){
      return("#C17A37");
  }else if(srmColor===12){
      return("#BF7138");
  }else if(srmColor===13){
      return("#BC6733");
  }else if(srmColor===14){
      return("#B26033");
  }else if(srmColor===15){
      return("#A85839");
  }else if(srmColor===16){
      return("#985336");
  }else if(srmColor===17){
      return("#8D4C32");
  }else if(srmColor===18){
      return("#7C452D");
  }else if(srmColor===19){
      return("#6B3A1E");
  }else if(srmColor===20){
      return("#5D341A");
  }else if(srmColor===21){
      return("#4E2A0C");
  }else if(srmColor===22){
      return("#4A2727");
  }else if(srmColor===23){
      return("#361F1B");
  }else if(srmColor===24){
      return("#261716");
  }else if(srmColor===25){
      return("#231716");
  }else if(srmColor===26){
      return("#19100F");
  }else if(srmColor===27){
      return("#16100F");
  }else if(srmColor===28){
      return("#120D0C");
  }else if(srmColor===29){
      return("#100B0A");
  }else if(srmColor===30){
      return("#050B0A");
  }else{
    return("#000000");
  }
};

$scope.byRange = function (ibumin, ibumax, abvmin, abvmax, srmmin, srmmax, minibu, maxibu, minabv, maxabv, minsrm, maxsrm) {
  if (minibu === undefined) minibu = Number.MIN_VALUE;
  if (maxibu === undefined) maxibu = Number.MAX_VALUE;

  return function predicateFunc(item) {
    return (minibu <= item[ibumin] && item[ibumax] <= maxibu) && (minabv <= item[abvmin] && item[abvmax] <= maxabv) && (minsrm <= item[srmmin] && item[srmmax] <= maxsrm);
  };
};

this.searchBeers = function(){
  console.log('searching...');
  $http({
    method: 'GET',
    url: '/beers/search/'+this.ibuMin+'/'+this.ibuMax,
  }).then(function(response){
    controller.beers = response.data;
  });
};

  this.create = function(){
    $http({
      method: 'POST',
      url: '/beers',
      data: {
        name: this.name,
        description: this.description,
        shortName: this.shortName,
      }
    }).then(function(response){
      controller.name="";
      controller.description="";
      controller.shortName="";
      controller.getBeers();
    });
  };

  this.deleteBeers = function(id){
    $http({
      method: 'DELETE',
      url: '/beers/'+id,
    }).then(function(response){
      console.log("deleted", response);
    }, function(response){
      console.log("failed", response);
    });
    controller.getBeers();
  };

  this.showEdit = function(id){
      this.editableBeersId = id;
  };

  this.updateBeers = function(beers){
    $http({
      method: 'PUT',
      url: '/beers/' + beers._id,
      data: beers
    }).then(function(response){
        controller.editableBeersId=null;
        controller.getBeers();
    });
  };

  this.getBeers = function(){
    $http({
      method: 'GET',
      url: '/beers'
    }).then(function(response){
      controller.beers = response.data;
    });
  };
  this.getBeers();
}]);


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
