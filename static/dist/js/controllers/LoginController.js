(function(angular){
	var app = angular.module('organizer');

	app.controller('LoginController', ['$scope', 'userService', '$state', function($scope, user, $state){
		$scope.user = {};

		$scope.submit = function(state){
			if(state == 'login'){
				user.login($scope.user, function(success, error){
					if(success)
						$state.go('projects');

					else
						$scope.$parent.alert('Login', error);
				});
			}
		
			if(state == 'register'){
				user.register($scope.user, function(success, errors, data){
					if(success)
						$scope.$parent.alert('Register', 'User was registrered');

					else
						$scope.$parent.alert('Register', 'Error on registrering user');
				});
			}
		};
	}]);
})(angular);