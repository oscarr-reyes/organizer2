(function(angular){
	var app = angular.module('organizer');

	app.controller('ProjectsController', ['$scope', function($scope){
		$scope.projects = [];
		$scope.sideMenu = {
			open: false
		};

		$scope.dial = {
			open: false
		};

		$scope.submit = function(status){
			if(status == 'new'){
				console.log($scope.form);
			}
		};

		$scope.$on('main.leftMenu', function(event){
			$scope.sideMenu.open = !$scope.sideMenu.open;
		});
	}]);
})(angular);