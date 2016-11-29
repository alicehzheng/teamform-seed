describe('test createProfile', function() {
	//var $controller, $rootScope, $state, $stateParams, $firebaseArray, $firebaseObject;
	beforeEach( function() {
		module('teamformApp','firebase','ui.router');
		inject(function(_$controller_,_$rootScope_,_$state_,_$stateParams_,_$firebaseArray_,$firebaseObject_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			$state = _$state_;
			$stateParams = _$stateParams_;
			$firebaseArray = _$firebaseArray_;
			$firebaseObject = _$firebaseObject_;
		});
	});
	describe('test createProfile functions', function() {
		var controller, scope, state, stateParams, firebaseArray, firebaseObject;
		beforeEach(function() {
			scope=$rootScope.$new();
			state = $state;
			stateParams = $stateParams;
			firebaseArray = $firebaseArray(ref);
			firebaseObject = $firebaseObject;
			controller = $controller('myProfileCtrl', {$scope: scope, $state: state, $stateParams: stateParams, $firebaseArray: firebaseArray, $firebaseObject: firebaseObject});
		});
		it('test initial vars', function() {
			expect(controller.user).toBeDefined();
		});
		
	});
});
