(function(angular){
	var app = angular.module('organizer');

	app.controller('MainController', ['$scope', '$state', '$mdDialog', function($scope, $state, $mdDialog){
		$scope.alert = function(title, message){
			var dialogAlert = $mdDialog.alert();

			dialogAlert.title(title);
			dialogAlert.textContent(message);

			dialogAlert.ok('Ok');

			$mdDialog.show(dialogAlert);
		};
	}]);
})(angular);