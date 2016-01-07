(function(angular){
	var app = angular.module('organizer');

	app.service('userService', ['$rootScope', '$resource', '$window', function($rootScope, $resource, $window){
		var self = this;
		var apiHost = 'http://' + $window.location.hostname + ':3000';

		/**
		 * User cache data to access globally
		 */
		self._data = {
			id: null,
			name: null,
			email: null
		};

		/**
		 * All messages for user
		 */
		self._messages = {
			login: {
				error: 'name/email or password is invalid'
			}
		};

		self.isGuest = true;
		
		/**
		 * Populate all necesary data user cache
		 * @param  {Object} data The data to populate
		 */
		self._populate = function(data){
			for(prop in self._data)
				self._data[prop] = data[prop];
		};

		/**
		 * Get the name of the user from user cache
		 * @return {String} The name of the user
		 */
		self.getName = function(){
			return self._data.username;
		};

		/**
		 * Get the id of the user from user cache
		 * @return {Integer} The id of the user
		 */
		self.getId = function(){
			return self._data.id;
		};

		/**
		 * Register a user with the given credentials and returns the result
		 * @param  {Object}   credentials The credentials of the user
		 * @param  {Function} callback    The callback to run when tries to register
		 */
		self.register = function(credentials, callback){
			var user = $resource(apiHost + '/users/');

			var newUser = new user(credentials);

			newUser.$save(function(data){
				if(data.success){
					$rootScope.$broadcast('user.registrered', data.data);
				}

				callback(data.success, data.errors, data.data);
			});
		};

		/**
		 * Login the user with the given credentials and returns the result
		 * @param  {Object}   credentials The credentials to send to server and login
		 * @param  {Function} callback    The result of the server response
		 */
		self.login = function(credentials, callback){
			var user = $resource(apiHost + '/users/login', null, {
				login: {
					method: 'POST'
				}
			});

			user.login(credentials).$promise.then(function(data){
				var result = {
					success: false,
					error: null
				};

				if(typeof data.id !== "undefined"){
					self._populate(data.toJSON());

					self.isGuest = false;
					result.success = true;

					$rootScope.$broadcast('user.logged');
				}

				else
					result.error = self._messages.login.error;

				callback(result.success, result.error);
			});
		};
	}]);
})(angular);