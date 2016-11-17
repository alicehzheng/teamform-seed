var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray', 'searchService',
  function($scope, $firebaseArray, searchService){
      $scope.searchText = "";
      $scope.startSearch = function(){
        $scope.events = searchService.startSearchEvent($scope.searchText)
      };
      var ref= firebase.database().ref('TeamForm/events');
      $scope.events = $firebaseArray(ref);
      $scope.goTo = function(id){
      }
}])
.controller('eventCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
 function($scope, $firebaseObject, $stateParams, $firebaseArray){
 var ref= firebase.database().ref('TeamForm/events/'+ $stateParams.id);
 var refTeams = firebase.database().ref('TeamForm/events/'+ $stateParams.id +'/teams');
 $scope.event = $firebaseObject(ref);
 $scope.teams = $firebaseArray(refTeams);
//  if(!$scope.event.teams){
//    $scope.teams = [];
//  } else
  console.log($scope.teams);


}])