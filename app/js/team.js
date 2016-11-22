// $(document).ready(function(){

// 	$('#team_page_controller').hide();
// 	$('#text_event_name').text("Error: Invalid event name ");
// 	var eventName = getURLParameter("q");
// 	if (eventName != null && eventName !== '' ) {
// 		$('#text_event_name').text("Event name: " + eventName);

// 	}

// });

angular.module('teamformApp')
    .controller('teamCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
        function($scope, $firebaseObject, $stateParams, $firebaseArray) {
            //internal variables
            var user = firebase.auth().currentUser;
            var ref = firebase.database().ref('TeamForm/teams/' + $stateParams.id);
            //var refUsers = firebase.database().ref('TeamForm/teams/' + $stateParams.id + '/members/');
            //var refProspect = firebase.database().ref('TeamForm/teams/' + $stateParams.id + '/prospects/');

            $scope.team = $firebaseObject(ref);
            //$scope.members = $firebaseArray(refUsers);
            $scope.prospect = {};
            $scope.users = [];
            $scope.prospectUser = [];


            //handels display of participating users
            $scope.team.$loaded().then(function(data) {
                console.log(data.members);
                data.members.forEach(function(value, index) {
                    var refUsers = firebase.database().ref('TeamForm/users/' + value);
                    var user = $firebaseObject(refUsers);
                    user.$loaded().then(function(data) {
                        $scope.users.push(user);
                        //console.log(user);
                    })

                });

                if (user) {
                    $scope.isAdmin = (user.uid == data.admin);
                    //console.log($scope.isAdmin + " " + user.uid + " " + data.admin);
                } else $scope.isAdmin = false;

                //if member is admin load prospective members
                if ($scope.isAdmin) {
                    data.prospects.forEach(function(value, index) {
                        var refUsers = firebase.database().ref('TeamForm/users/' + value);
                        var user = $firebaseObject(refUsers);
                        $scope.prospectUser.push(user);
                    });
                }
                //$scope.joined = data.members.indexOf(user.uid) >= 0 || data.prospects.indexOf(user.uid) >= 0;
                //console.log($scope.users);

            });




            $scope.join = function() {
                $scope.prospect = $firebaseArray(refProspect);
                $scope.prospect.push(user.uid);
                $scope.joined = true;
            }


        }]);

	// .controller('TeamCtrl_peter', ['$scope', '$firebaseObject', '$firebaseArray',
	// 	function ($scope, $firebaseObject, $firebaseArray) {

	// 		// Call Firebase initialization code defined in site.js
	// 		//initalizeFirebase();

	// 		var refPath = "";
	// 		var eventName = getURLParameter("q");

	// 		$scope.input = {
	// 			"teamName": '',
	// 			"description": "hi we're cool",
	// 			"currentTeamSize": 0,
	// 			"tags": [],
	// 			"teamMembers": []
	// 		};

	// 		$scope.addEvent = function () {
	// 			// update the date
	// 			if ($scope.input.name != "" && $scope.input.description != "" && $scope.tags != "") {
	// 				$scope.input.admin = firebase.auth().currentUser.uid;
	// 				$scope.input.created = new Date().toString();
	// 				var re = new RegExp(", |,");
	// 				var tags = $scope.tags.split(re);
	// 				if (tags[tags.length - 1] == "")
	// 					tags.splice(tags.length - 1, 1);
	// 				alert(tags);
	// 				$scope.input.tags = tags;
	// 				// add an input event
	// 				$scope.events.$add($scope.input);
	// 			} else alert("please complete all requiered fields before proceeding");
	// 		}



	// 		refPath = eventName + "/admin";
	// 		retrieveOnceFirebase(firebase, refPath, function (data) {
	// 			if (data.child("param").val() != null) {
	// 				$scope.range = data.child("param").val();
	// 				$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize) / 2);
	// 				$scope.$apply(); // force to refresh
	// 				$('#team_page_controller').show(); // show UI

	// 			}
	// 		});


	// 		refPath = eventName + "/member";
	// 		$scope.member = [];
	// 		$scope.member = $firebaseArray(firebase.database().ref(refPath));


	// 		refPath = eventName + "/team";
	// 		$scope.team = [];
	// 		$scope.team = $firebaseArray(firebase.database().ref(refPath));


	// 		$scope.requests = [];
	// 		$scope.refreshViewRequestsReceived = function () {

	// 			//$scope.test = "";		
	// 			$scope.requests = [];
	// 			var teamID = $.trim($scope.param.teamName);

	// 			$.each($scope.member, function (i, obj) {
	// 				//$scope.test += i + " " + val;
	// 				//$scope.test += obj.$id + " " ;

	// 				var userID = obj.$id;
	// 				if (typeof obj.selection != "undefined" && obj.selection.indexOf(teamID) > -1) {
	// 					//$scope.test += userID + " " ;

	// 					$scope.requests.push(userID);
	// 				}
	// 			});

	// 			$scope.$apply();

	// 		}


	// 		$scope.changeCurrentTeamSize = function (delta) {
	// 			var newVal = $scope.param.currentTeamSize + delta;
	// 			if (newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize) {
	// 				$scope.param.currentTeamSize = newVal;
	// 			}
	// 		}

	// 		$scope.saveFunc = function () {


	// 			var teamID = $.trim($scope.param.teamName);

	// 			if (teamID !== '') {

	// 				var newData = {
	// 					'size': $scope.param.currentTeamSize,
	// 					'teamMembers': $scope.param.teamMembers
	// 				};

	// 				var refPath = getURLParameter("q") + "/team/" + teamID;
	// 				var ref = firebase.database().ref(refPath);


	// 				// for each team members, clear the selection in /[eventName]/team/

	// 				$.each($scope.param.teamMembers, function (i, obj) {


	// 					//$scope.test += obj;
	// 					var rec = $scope.member.$getRecord(obj);
	// 					rec.selection = [];
	// 					$scope.member.$save(rec);



	// 				});



	// 				ref.set(newData, function () {

	// 					// console.log("Success..");

	// 					// Finally, go back to the front-end
	// 					// window.location.href= "index.html";
	// 				});



	// 			}


	// 		}

	// 		$scope.loadFunc = function () {

	// 			var teamID = $.trim($scope.param.teamName);
	// 			var eventName = getURLParameter("q");
	// 			var refPath = eventName + "/team/" + teamID;
	// 			retrieveOnceFirebase(firebase, refPath, function (data) {

	// 				if (data.child("size").val() != null) {

	// 					$scope.param.currentTeamSize = data.child("size").val();

	// 					$scope.refreshViewRequestsReceived();


	// 				}

	// 				if (data.child("teamMembers").val() != null) {

	// 					$scope.param.teamMembers = data.child("teamMembers").val();

	// 				}

	// 				$scope.$apply(); // force to refresh
	// 			});

	// 		}

	// 		$scope.processRequest = function (r) {
	// 			//$scope.test = "processRequest: " + r;

	// 			if (
	// 				$scope.param.teamMembers.indexOf(r) < 0 &&
	// 				$scope.param.teamMembers.length < $scope.param.currentTeamSize) {

	// 				// Not exists, and the current number of team member is less than the preferred team size
	// 				$scope.param.teamMembers.push(r);

	// 				$scope.saveFunc();
	// 			}
	// 		}

	// 		$scope.removeMember = function (member) {

	// 			var index = $scope.param.teamMembers.indexOf(member);
	// 			if (index > -1) {
	// 				$scope.param.teamMembers.splice(index, 1); // remove that item

	// 				$scope.saveFunc();
	// 			}

	// 		}







	// 	}]);
