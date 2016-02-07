(function(angular){
	var app = angular.module('organizer');

	app.service('userService', ['$rootScope', '$resource', '$window', '$cookies', function($rootScope, $resource, $window, $cookies){
		var self = this;
		var apiHost = 'http://' + $window.location.hostname + ':3000';

		var user = $resource(apiHost + '/users/:action/:query', {query: '@query'}, {
			login: {
				method: 'POST',
				params: {
					action: 'login'
				}
			},
			search: {
				method: 'GET',
				isArray: true,
				params: {
					action: 'search',
					query: '@query'
				}
			}
		});

		/**
		 * User cache data to access globally
		 */
		self._data = {
			id: null,
			name: null,
			email: null,
			accessToken: null
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
			return self._data.name;
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
			user.login(credentials).$promise.then(function(data){
				var result = {
					success: false,
					error: null
				};

				if(typeof data.id !== "undefined"){
					self._populate(data.toJSON());

					if(credentials.remember)
						self.storeAccessToken();

					self.isGuest = false;
					result.success = true;

					$rootScope.$broadcast('user.logged');
				}

				else
					result.error = self._messages.login.error;

				callback(result.success, result.error);
			});
		};

		/**
		 * Logout the user, delete user's data in cache
		 * @return {boolean} Whenever if user was logged out successfully
		 */
		self.logout = function(){
			if(self.isGuest)
				return false;

			else{
				for(prop in self._data)
					self._data[prop] = null;

				self.isGuest = true;

				self.removeToken();

				$rootScope.$broadcast('user.unlogged');

				return true;
			}
		};

		/**
		 * Get list of all users
		 * @return {array} The list of all users in database
		 */
		self.search = function(name){
			return user.search({query: name}, function(result){
				return result;
			});
		}

		/**
		 * Store the access token of the user for auto re-login
		 * @return {void}
		 */
		self.storeAccessToken = function(){
			var token = self._data.accessToken;
			var time = new Date();

			$cookies.put('accessToken', token, {
				expires: new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())
			});
		};

		/**
		 * Remove the token stored in cookies if exists
		 * @return {void}
		 */
		self.removeToken = function(){
			if(self.hasToken)
				$cookies.remove('accessToken');
		};

		/**
		 * Logs the user with a token stored in cookies
		 * @return {void}
		 */
		self.logByToken = function(){
			if(self.hasToken()){
				self.login({token: $cookies.get('accessToken')}, function(){});
				return true;
			}

			else
				return false;
		}

		/**
		 * Check if client has token to access
		 * @return {void}
		 */
		self.hasToken = function(){
			if($cookies.get('accessToken'))
				return true;

			return false;
		}
	}]);
})(angular);