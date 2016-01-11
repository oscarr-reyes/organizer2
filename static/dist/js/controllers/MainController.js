(function(angular){
	var app = angular.module('organizer');

	app.controller('MainController', ['$scope', '$state', '$mdDialog', 'userService', function($scope, $state, $mdDialog, user){
		$scope.codeStatus = {
			1: "Not Started",
			2: "Pending",
			3: "In Progress",
			4: "Finished",
			5: "Unknown"
		};

		$scope.sideMenu = {
			open: false,
			title: '',
			content: []
		};

		$scope.user = {
			toggleMenu: function($mdOpenMenu, event){
				$mdOpenMenu(event);
			},
			menu: function(option){
				if(option == 'logout'){
					if(user.logout())
						$state.go('layout.login');
				}
			},
			data: {
				name: user.getName(),
				guest: user.isGuest
			}
		};
		
		$scope.alert = function(title, message){
			var dialogAlert = $mdDialog.alert();

			dialogAlert.title(title);
			dialogAlert.textContent(message);

			dialogAlert.ok('Ok');

			$mdDialog.show(dialogAlert);
		};

		$scope.leftMenu = function(){
			$scope.sideMenu.open = !$scope.sideMenu.open;
		};

		$scope.populateMenu = function(data){
			for(i in data)
				$scope.sideMenu[i] = data[i];
		};

		$scope.$on('user.logged', function(event){
			$scope.user.data.name = user.getName();
			$scope.user.data.guest = user.isGuest;
		});

		$scope.$on('user.unlogged', function(event){
			$scope.user.data.name = user.getName();
			$scope.user.data.guest = user.isGuest;
		});

		$scope.$on('$locationChangeSuccess', function(event){
			if(user.isGuest)
				$state.go('layout.login');
		});

	}]);
})(angular);