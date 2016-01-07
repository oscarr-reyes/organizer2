(function(angular){
	var app = angular.module('organizer');

	app.controller('MainController', ['$scope', '$state', '$mdDialog', 'userService', function($scope, $state, $mdDialog, user){
		$scope.alert = function(title, message){
			var dialogAlert = $mdDialog.alert();

			dialogAlert.title(title);
			dialogAlert.textContent(message);

			dialogAlert.ok('Ok');

			$mdDialog.show(dialogAlert);
		};

		$scope.leftMenu = function(){
			$scope.$broadcast('main.leftMenu');
		};

		$scope.$on('$locationChangeSuccess', function(event){
			if(user.isGuest)
				$state.go('layout.login');
		});

		$scope.codeStatus = {
			1: "Not Started",
			2: "Pending",
			3: "In Progress",
			4: "Finished",
			5: "Unknown"
		};
	}]);
})(angular);