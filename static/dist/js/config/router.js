(function(angular){
	var app = angular.module('organizer');

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		// redirect to / when there is no state that matches with the provided url
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('layout', {
			url: '/',
			views: {
				'@':{
					templateUrl: 'views/layout/main.html',
				}
			}
		});

		$stateProvider.state('login', {
			url: 'login',
			parent: 'layout',
			views: {
				'main@layout': {
					templateUrl: 'views/site/login.html',
					controller: 'LoginController'
				}
			}
		});

		$stateProvider.state('projects', {
			url: 'projects',
			parent: 'layout',
			views: {
				'main@layout': {
					templateUrl: 'views/projects/index.html',
					controller: 'ProjectsController'
				},
				'projects@projects': {
					templateUrl: 'views/projects/_view.html',
					controller: 'ProjectsController'
				}
			}
		});

		$stateProvider.state('projects.create', {
			url: '/create',
			parent: 'projects',
			views: {
				'projects@projects': {
					templateUrl: 'views/projects/create.html',
					controller: 'ProjectsController'
				}
			}
		});

		$stateProvider.state('tasks', {
			url: '/:projectId',
			parent: 'projects',
			views: {
				'main@layout': {
					templateUrl: 'views/tasks/index.html',
					controller: 'TasksController'
				},
				'tasks@tasks': {
					templateUrl: 'views/tasks/_view.html',
					controller: 'TasksController'
				}
			}
		});

		$stateProvider.state('tasks.create', {
			url: '/create',
			parent: 'tasks',
			views: {
				'tasks@tasks': {
					templateUrl: 'views/tasks/create.html',
					controller: 'TasksController'
				}
			}
		});
	}]);
})(angular);