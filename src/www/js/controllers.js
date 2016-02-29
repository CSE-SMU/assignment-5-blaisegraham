angular.module('starter.controllers', []) 

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.factory('BeerData', function() {
  return {data: {}};
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {     
  $scope.form = {};                                             

  $scope.search = function() {                                         
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',               
      params: {                                                           
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
      BeerData.data = response.data;                                      
      $state.go('app.beers');                                             
    })
  }
})



.controller('BeersCtrl', function($scope, BeerData) {
  $scope.beerList = BeerData.data.data;
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  $scope.beerList = BeerData.data.data;
  $scope.selectedID = $stateParams.id;
});
