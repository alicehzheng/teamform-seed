// inject firebase service
var app = angular.module("teamform-46380", ["firebase"]); 

app.controller("searchCtrl", 
	function($scope) {
		$scope.searchText = "Search your Team!";
		$scope.startSearch = function() {
			var text = $scope.searchText;
			var team = null;
			var query = firebase.database().ref("TeamForm/teams")
			query.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var key = childSnapshot.key;
				if(key == text || childSnapshot.child("tags/Art/" + text).exists() ||  childSnapshot.child("tags/Technology").exists()){
					team = key;
					return true;
				}
			}
			});
			if(team == null)
				$scope.searchText = "Team doesn't exist, search another one!";
			}
			else {
				
			}
	}
);