(function(angular){
	var app = angular.module('organizer');

	app.controller('LoginController', ['$scope', 'userService', function($scope, user){
		$scope.user = {};

		$scope.submit = function(state){
			if(state == 'login')
				$scope.$parent.alert('Login', 'Login user');
		
			if(state == 'register')
				$scope.$parent.alert('Register', 'Register user');
		};
	}]);
})(angular);