var app = angular.module('BeersApp', []);

app.controller("MainController", ['$http', function($http){
  var controller = this;
  this.swapper = 0;
this.next = function(){
  this.swapper++;
  console.log(this.swapper);
};

this.prev = function() {
  this.swapper --;
  console.log(this.swapper);
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
