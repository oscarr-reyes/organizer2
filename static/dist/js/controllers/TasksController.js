(function(angular){
	var app = angular.module('organizer');

	app.controller('TasksController', ['$scope', '$state', '$window', '$resource', 'userService', function($scope, $state, $window, $resource, userService){
		var restUrl  = 'http://' + $window.location.hostname + ':3000/tasks';
		var tasks = $resource(restUrl, {});

		$scope.data = {
			loading: false,
			tasks: [],
		};

		$scope.assigned = [];
		$scope.selfAssign = false;

		$scope.form = {
			name: null,
			status: null,
			assigned: [],
			description: null
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

		$scope.searchUser = function(name){
			return userService.search(name).$promise;
		};

		$scope.submit = function(state){
			if(state == 'new'){
				$scope.form.user_id = userService.getId();
				$scope.form.assigned = transform($scope.assigned);
				$scope.form.project_id = $state.params.projectId;

				if($scope.selfAssign)
					$scope.form.assigned.push(userService.getId());

				var task = new tasks($scope.form);

				task.$save(function(data){
					console.log(data);
				});
			}
		};

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

		function transform(arr){
			var sum = [];

			for(e in arr)
				sum.push(arr[e].id);

			return sum;
		}
	}]);
})(angular);