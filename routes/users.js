var sequelize = require('sequelize');

module.exports = function(app){
	// Define "/users" url
	app.get('/users', function($){
		// Get user model
		var user = $.db.import(__dirname + "/../models/user.js");

		// execute call to db and send the result
		user.findAll()
			.then(function(user){
				$.data = user;
				$.json();
			})
			.catch(function(err){
				console.log(err);
			});
	});

	/**
	 * Find a user by a specific name
	 * @name  String  The name of the user
	 * @return JSON   Returns the result of the search
	 */
	app.get('/users/:name', function($){
		var user = $.db.import(__dirname + "/../models/user.js");
		
		var query = {
			where: {
				name: $.params.name
			}
		};

		user.findOne(query)
			.then(function(user){
				$.data = user;
				$.json();
			})
			.catch(function(err){
				$.data = err;
				$.json();
			});
	});

	/**
	 * Find a user with the login's credentials and return if this user is found
	 * @method  POST
	 * @param {String} name The user name or password to find
	 * @param {Integer} password The user password to find
	 * @return JSON  Returns the result of login search
	 */
	app.post('/users/login', function($){
		var user = $.db.import(__dirname + "/../models/user.js");

		if($.body.token){
			var query = {
				where: {
					accessToken: $.body.token
				}
			};
		}

		else{
			var query = {
				where: {
					$or: [{name: $.body.name}, {email: $.body.name}],
					$and: {password: $.body.password}
				}
			};
		}

		user.findOne(query)
			.then(function(user){
				$.data = user;
				$.json();
			})
			.catch(function(err){
				$.data = err;
				$.json();
			});
	});

	/**
	 * Create a new user with the provided credentials and return the created user
	 * @method  {POST}
	 * @param   {String}   name: The name of the user
	 * @param   {Integer}  password: The password for security of the user
	 * @param   {String}   email: The email of the user
	 */
	app.post('/users', function($){
		var user = $.db.import(__dirname + "/../models/user.js");
	
		$.data = {
			success: true,
			data: null,
			errors: null
		};

		user.create($.body)
			.then(function(result){
				$.data.data = result;
				$.json();
			})
			.catch(function(err){
				$.data.errors = err;
				$.data.success = false;
				$.json();
			});
	});
};