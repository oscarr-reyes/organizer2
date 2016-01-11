(function(angular){
	var app = angular.module('organizer');

	app.controller('TasksController', ['$scope', '$state', function($scope, $state){
		$scope.$on('$stateChangeSuccess', function(event, state){
			getTasks($state.params.projectId);
		});

		function getTasks(projectId){
			console.log(projectId);
		}
	}]);
})(angular);