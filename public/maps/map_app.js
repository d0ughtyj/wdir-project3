var app = angular.module('myApp', ['ngMap']);
console.log('ng map controller loaded');

  app.controller('MapController', function($scope,$timeout) {
    $scope.value = 75;
    var vm = this;
    console.log('mapController loaded');
    vm.mapUser = 'johnd';
    vm.mapZip = '80803';
    vm.mapState = 'CO';
    vm.mapAddress = '120 South Tejon, Colorado Springs, CO';
    vm.mapFav ='IPA';
    vm.mapRating = 98;
    vm.showMap1 = false;
    vm.showMap2 = false;
    vm.showMap3 = false;
    vm.showMap4 = false;

    vm.cities = {
      chicago: {population:2714856, position: [41.878113, -87.629798]},
      newyork: {population:8405837, position: [40.714352, -74.005973]},
      losangeles: {population:3857799, position: [34.052234, -118.243684]},
      vancouver: {population:603502, position: [49.25, -123.1]},
    };
    vm.getRadius = function(num) {
      return Math.sqrt(num) * 100;
    };

    // $scope.render = false;
    // console.log('render fired');
    // //console.log('render scope '+ $scope);
    // $timeout(function () {
    //         $scope.render = true;
    // }, 1000);

    // vm.displayRating = function() {
    //   console.log('displayRating');
    // };
    //$scope.displayRating = function(divToShow){

    vm.displayRating = function() {
      console.log('displayRating');
    };


// https://github.com/allenhwkim/angularjs-google-maps/issues/59


  });

// ******************************************************//
// app.controller('MyController', function(NgMap) {
//   NgMap.getMap().then(function(map) {
//     console.log(map.getCenter());
//     console.log('markers', map.markers);
//     console.log('shapes', map.shapes);
//   });
// });
// ******************************************************//
