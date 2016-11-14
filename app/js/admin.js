var app = angular.module("teamformApp");

app.factory('adminService', ['$rootScope','$timeout', function($location, $rootScope, $timeout) {
	var Admin = true;
	var isAdmin = {};
	isAdmin.get = function(){
		return Admin;
	}
	isAdmin.set = function(boolean){
		Admin = boolean;
	}
	return {
		isAdmin,
		Admin,
		swit: function() {	
			Admin =	false;
			isAdmin.set(false);
		}
	}
}]);

app.controller("AdminCtrl", ['$scope', 'adminService', '$location', '$rootScope',
  function ($scope, adminService, $location, $rootScope) {

  	// defin hide or show Edit button
  	$scope.isAdmin = adminService.isAdmin.get();
  	$scope.admin = adminService.Admin;
  	$rootScope.$on("updates", function(){
  		$scope.isAdmin = adminService.isAdmin.get();
  	});
  	$scope.swit = function() {
  		adminService.swit();
  	};

  }]);