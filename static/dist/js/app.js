(function(angular){
	var app = angular.module('organizer', ['ngMaterial', 'ui.router']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		// redirect to / when there is no state that matches with the provided url
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('main', {
			url: '/',
			views: {
				'@':{
					templateUrl: 'views/layout/main.html',
					controller: 'MainController' 
				}
			}
		});
	}]);
})(angular);