var app = angular.module("teamformApp");
app.factory('recommendService', function ($firebaseArray) {
  var database = firebase.database();
  var events;
  var teams = {};
  var userTags = {};
  var userSubs = [];
  var userCats = [];
  var recEvents = [];
  var allTags = {
    "Computer Science": { "name": "Computer Science", "Sub": "Computer Science", "Cat": "Computer Science" },
    "Java": { "name": "Java", "Sub": "Programming", "Cat": "Computer Science" },
    "C++": { "name": "C++", "Sub": "Programming", "Cat": "Computer Science" },
    "Python": { "name": "Python", "Sub": "Programming", "Cat": "Computer Science" },
    "JavaScript": { "name": "JavaScript", "Sub": "Programming", "Cat": "Computer Science" },
    "C": { "name": "C", "Sub": "Programming", "Cat": "Computer Science" },
    "Assembly": { "name": "Assembly", "Sub": "Programming", "Cat": "Computer Science" },
    "Swift": { "name": "Swift", "Sub": "Programming", "Cat": "Computer Science" },
    "AngularJS": { "name": "AngularJS", "Sub": "Framework", "Cat": "Computer Science" },
    "Django": { "name": "Django", "Sub": "Framework", "Cat": "Computer Science" },
    "Ruby-on-Rails": { "name": "Ruby-on-Rails", "Sub": "Framework", "Cat": "Computer Science" },
    "Node.js": { "name": "Node.js", "Sub": "Framework", "Cat": "Computer Science" },
    "asp.net": { "name": "asp.net", "Sub": "Framework", "Cat": "Computer Science" },
    "Math": { "name": "Math", "Sub": "Science", "Cat": "Science" },
    "Physics": { "name": "Physics", "Sub": "Science", "Cat": "Science" },
    "Chemistry": { "name": "Chemistry", "Sub": "Science", "Cat": "Science" },
    "Biology": { "name": "Biology", "Sub": "Science", "Cat": "Science" },
    "Science": { "name": "Science", "Sub": "Science", "Cat": "Science" },
    "Art": { "name": "Art", "Sub": "Art", "Cat": "Art" },
    "Film": { "name": "Film", "Sub": "Digital", "Cat": "Art" },
    "Photography": { "name": "Photography", "Sub": "Digital", "Cat": "Art" },
    "Photoshop": { "name": "Photoshop", "Sub": "Digital", "Cat": "Art" },
    "Graphic Design": { "name": "Graphic Design", "Sub": "Digital", "Cat": "Art" },
    "Painting": { "name": "Painting", "Sub": "Physical", "Cat": "Art" },
    "Drawing": { "name": "Drawing", "Sub": "Physical", "Cat": "Art" },
    "Sculpting": { "name": "Sculpting", "Sub": "Physical", "Cat": "Art" },
    "Dance": { "name": "Dance", "Sub": "Performing", "Cat": "Art" },
    "Music": { "name": "Music", "Sub": "Performing", "Cat": "Art" },
    "Acting": { "name": "Acting", "Sub": "Performing", "Cat": "Art" },
    "Singing": { "name": "Singing", "Sub": "Performing", "Cat": "Art" },
    "Food": { "name": "Food", "Sub": "Food", "Cat": "Food" },
    "Cooking": { "name": "Cooking", "Sub": "Cooking", "Cat": "Food" },
    "Baking": { "name": "Baking", "Sub": "Cooking", "Cat": "Food" },
    "Cake Decorating": { "name": "Cake Decorating", "Sub": "Cooking", "Cat": "Food" },
    "Sports": { "name": "Sports", "Sub": "Sports", "Cat": "Sports" },
    "Basketball": { "name": "Basketball", "Sub": "Team", "Cat": "Sports" },
    "Baseball": { "name": "Baseball", "Sub": "Team", "Cat": "Sports" },
    "Football": { "name": "Football", "Sub": "Team", "Cat": "Sports" },
    "Tennis": { "name": "Tennis", "Sub": "Racket", "Cat": "Sports" },
    "Badminton": { "name": "Badminton", "Sub": "Racket", "Cat": "Sports" },
    "Squash": { "name": "Squash", "Sub": "Racket", "Cat": "Sports" },
    "Swimming": { "name": "Swimming", "Sub": "Outdoor", "Cat": "Sports" },
    "Jogging": { "name": "Jogging", "Sub": "Outdoor", "Cat": "Sports" },
    "Hiking": { "name": "Hiking", "Sub": "Outdoor", "Cat": "Sports" }

  };



  var getRecommendations = function () {
    var user = firebase.auth().currentUser;
    var userRef = database.ref('TeamForm/users/' + user.uid + '/tags');
    $firebaseArray(userRef).$loaded().then(function (u) {
      userTags = u;
      var eventRef = database.ref('TeamForm/events');
      $firebaseArray(eventRef).$loaded().then(function (e) {
        events = e;
        compareEventTags();
        recEvents.sort(sortEvents);
        return recEvents;
      });
    });
  }

  var compareEventTags = function () {
    for (var i = 0; i < events.length; i++) {
      for (var j = 0; j < events[i].tags.length; j++) {
        recEvents = compareToUser((events[i].tags[j]), recEvents, events[i]);

      }
    }
  }

  var compareToUser = function (compareTag, array, id) {
    var points = 0;
    for (var i = 0; i < userTags.length; i++) {

      if (allTags[compareTag] && allTags[userTags[i].$value]) {

        if (allTags[compareTag].name == allTags[userTags[i].$value].name) {
          points += 4;
        }
        if (allTags[compareTag].Sub == allTags[userTags[i].$value].Sub) {
          points += 2;
        }
        if (allTags[compareTag].Cat == allTags[userTags[i].$value].Cat) {
          points += 1;
        }
      }
    }
    if (points > 0) {
      var element = id;
      element.points = points;
      array.push(element);
    }
    return array;
  }

  var sortEvents = function (a, b) {
    return b.points - a.points;
  }


  // var getSpecTeams = function(eventID){
  //   database.ref('TeamForm/event/' + eventID + '/team').once('value').then(function(info) {
  //      teamId = info.val();
  //   });
  // }



  return {
    getRecommendations,
    recEvents
  }




});


app.controller('recommendCtrl', ['$scope', 'recommendService', '$location', '$firebaseArray',
  function ($scope, $recommendService, $location, $firebaseArray) {

    $scope.getRecommendations = function () {
      $scope.events = $recommendService.getRecommendations();
    };

    $scope.go = function (path) {
      $location.path(path);
    };


  }]);
