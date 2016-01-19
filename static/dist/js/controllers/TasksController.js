(function(angular){
	var app = angular.module('organizer');

	app.controller('TasksController', ['$scope', '$state', '$window', '$resource', function($scope, $state, $window, $resource){
		var restUrl  = 'http://' + $window.location.hostname + ':3000/tasks';
		var tasks = $resource(restUrl, {});

		$scope.data = {
			loading: false,
			tasks: []
		};

		$scope.menu = {
			title: 'Tasks',
			content: [
				{
					name: 'index',
					sref: 'tasks'
				}, {
					name: 'create',
					sref: 'tasks.create({projectId: ' + $state.params.projectId + '})'
				}, {
					name: 'back',
					sref: 'projects'
				}
			]
		}

		$scope.$on('$stateChangeSuccess', function(event, state){
			$scope.data.loading = true;
			$scope.$parent.populateMenu($scope.menu);
			getTasks($state.params.projectId);
		});

		function getTasks(projectId){
			tasks.query(function(data){
				$scope.data.tasks = data;
				$scope.data.loading = false;
			});
		}
	}]);
})(angular);