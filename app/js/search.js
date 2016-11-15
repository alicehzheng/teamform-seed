var app = angular.module("teamformApp"); 

app.controller("searchCtrl", ['$scope',
	function($scope) {
		$scope.searchText = "Search your Team!";
		$scope.startSearch = function() {
			var text = $scope.searchText;
			var team = null;
			var database = firebase.database();
			var query = database.ref("TeamForm/teams/");
			query.once("value").then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var key = childSnapshot.key;
					if(key == text || childSnapshot.child("tags/Art/" + text).exists() ||  childSnapshot.child("tags/Technology").exists()){
						team = key;
						return true;
					}
				});
			if(team == null) {
				$scope.searchText = "Team doesn't exist, search another one!";
			}
			else{
				$scope.searchText = team;
			}
			
		}); 
	}
}])