angular.module('starter.controllers', []) //defining a new model | App.js is dependant on this file

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.form = {};

  $scope.search = function() {
    
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               // the link to my proxy
      params: {                                                           // sets the GET params
        name: $scope.form.name,
        hasLabels: $scope.form.labels,
        isOrganic: $scope.form.organic,
        abv: $scope.form.abv,
        ibu: $scope.form.ibu,
        order: $scope.form.order,
        sort: $scope.form.sort
      }
    })
    
    .then(function successCallback(response) {
      console.log("SEARCH FUNCTION CALLED");
      console.log("name: " + $scope.form.name);
      console.log("labels: " + $scope.form.labels);
      console.log("organic: " + $scope.form.organic);
      console.log("abv: " + $scope.form.abv);
      console.log("order: " + $scope.form.order);
      console.log("sort: " + $scope.form.sort);
      BeerData.data = response.data;                                      // save the response data in the factory
      $state.go('app.beers');                                             // go to the beer results state
    });      
  }
})

.factory('BeerData', function() {
  return {data: {}};
})


.controller('BeersCtrl', function($scope, BeerData) {
  $scope.beerList = BeerData.data.data;
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  $scope.beerList = BeerData.data.data;
  $scope.selectedID = $stateParams.id;
});
