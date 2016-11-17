var app = angular.module("teamformApp"); 

app.factory("searchService",
	function($firebaseArray) {
		var database = firebase.database();

		var startSearchTeam = function(searchText) {
			var teams = [];
			var query = database.ref("TeamForm/teams");
			var allTeams = $firebaseArray(query);
			for(var i = 0; i < allTeams.length; ++i){
				if(searchText == allTeams[i].name){
					teams.push(allTeams[i])
				}
			}
			return teams;
		};


		var startSearchEvent = function(searchText) {
			var events = [];
			var ref= database.ref("TeamForm/events");
			var allTeams = $firebaseArray(ref);
			allTeams.forEach(function(){
				if(searchText == allTeams[i].name){
					events.push(allTeams[i])
				}
			
			return events;
			}
			);
		};


		return{
			startSearchTeam,
			startSearchEvent
		}

})