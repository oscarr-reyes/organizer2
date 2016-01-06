(function(angular){
	var app = angular.module('organizer', ['ngMaterial', 'ui.router']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		// redirect to / when there is no state that matches with the provided url
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('layout', {
			url: '/',
			views: {
				'@':{
					templateUrl: 'views/layout/main.html',
					controller: 'MainController' 
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
	}]);
})(angular);