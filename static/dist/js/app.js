(function(angular){
	var app = angular.module('organizer', ['ngMaterial', 'ui.router', 'ngResource']);

	app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdIconProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $mdIconProvider){
		$mdIconProvider.defaultIconSet('dist/svg/mdi.svg');

		// Use x-www-form-urlencoded Content-Type
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

		/**
		* The workhorse; converts an object to x-www-form-urlencoded serialization.
		* @param {Object} obj
		* @return {String}
		*/ 
		var param = function(obj) {
			var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

			for(name in obj) {
				value = obj[name];

				if(value instanceof Array) {
				for(i=0; i<value.length; ++i) {
				subValue = value[i];
				fullSubName = name + '[' + i + ']';
				innerObj = {};
				innerObj[fullSubName] = subValue;
				query += param(innerObj) + '&';
				}
				}
				else if(value instanceof Object) {
					for(subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value !== undefined && value !== null)
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}

			return query.length ? query.substr(0, query.length - 1) : query;
		};

		// Override $http service's default transformRequest
		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}];


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

		$stateProvider.state('layout.login', {
			url: 'login',
			views: {
				'main@layout': {
					templateUrl: 'views/site/login.html',
					controller: 'LoginController'
				}
			}
		});

		$stateProvider.state('layout.projects', {
			url: 'projects',
			views: {
				'main@layout': {
					templateUrl: 'views/projects/index.html',
					controller: 'ProjectsController'
				},
				'projects@layout.projects': {
					templateUrl: 'views/projects/_view.html',
					controller: 'ProjectsController'
				}
			}
		});

		$stateProvider.state('layout.projects.create', {
			url: '/create',
			views: {
				'projects@layout.projects': {
					templateUrl: 'views/projects/create.html',
					controller: 'ProjectsController'
				}
			}
		});

		$stateProvider.state('layout.projects.tasks', {
			url: '/:projectId',
			views: {
				'main@layout': {
					templateUrl: 'views/tasks/index.html',
					controller: 'TasksController'
				}
			}
		});
	}]);
})(angular);