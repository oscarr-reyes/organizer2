var sequelize = require('sequelize');

module.exports = function(app){
	app.get('/projects', function($){
		var project = $.db.import(__dirname + '/../models/project.js');

		project.findAll()
			.then(function(data){
				$.data = data;
				$.json();
			}).
			catch(function(err){
				console.log('[sequelize] project:', err);
			});
	});

	app.post('/projects', function($){
		var project = $.db.import(__dirname + '/../models/project.js');

		$.data = {
			success: true,
			data: null,
			errors: null
		};

		project.create($.body)
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

	app.get('/projects/type', function($){
		var types = $.db.import(__dirname + '/../models/projecttype.js');

		types.findAll()
			.then(function(data){
				$.data = data;
				$.json();
			})
			.catch(function(err){
				console.log(err);
			});
	});
};