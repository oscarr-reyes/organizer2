(function(angular){
	var app = angular.module('organizer');

	app.controller('ProjectsController', ['$scope', '$resource', '$window', '$state', function($scope, $resource, $window, $state){
		var restUrl  = 'http://' + $window.location.hostname + ':3000/projects';
		var projects = $resource(restUrl + '/:path ', {}, {
			types: {
				method: 'GET',
				params: {path: 'type'},
				isArray: true
			}
		});

		$scope.data = {
			loading: false,
			projects: []
		};

		$scope.types = [];

		$scope.menu = {
			title: 'Projects',
			content: [
				{
					name: 'index',
					sref: 'layout.projects'
				}, {
					name: 'create',
					sref: 'layout.projects.create'
				}
			]
		};

		$scope.loadTypes = function(){
			projects.types().$promise.then(function(data){
				$scope.types = data;
			});
		}

		$scope.submit = function(status){
			if(status == 'new'){
				var project = new projects($scope.form);

				project.$save(function(data){
					if(data.success){
						$state.go('layout.projects');
						console.log(data);
					}

					else{
						$scope.$parent.alert('Projects', 'There was an error saving the project');
						console.log(data.errors);
					}
				});
			}
		};

		$scope.$on('main.leftMenu', function(event){
			$scope.sideMenu.open = !$scope.sideMenu.open;
		});

		$scope.$on('$stateChangeSuccess', function(event, state){
			if(!$scope.data.loading && state.name == 'layout.projects'){
				$scope.data.loading = true;
				$scope.$parent.populateMenu($scope.menu);
				getProjects();
			}
		});

		function getProjects(){
			projects.query(function(data){
				$scope.data.projects = data;
				$scope.data.loading = false;
			});
		}
	}]);
})(angular);