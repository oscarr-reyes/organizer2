(function(angular){
	var app = angular.module('organizer');

	app.service('userService', ['$rootScope', function($rootScope){
		var self = this;

		self._data = {
			id: null,
			name: null,
		};

		self.isGuest = true;

		self.getName = function(){
			return self._data.name;
		};

		self.getId = function(){
			return self._data.id;
		};

		self.login = function(credentials){
			console.log(credentials);
		};
	}]);
})(angular);