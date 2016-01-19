var sequelize = require('sequelize');

module.exports = function(app){
	/**
	 * Get all tasks or get some tasks from specific project id
	 * @query  {integer}	{byProject}	The id of the project where tasks are listed from
	 * @return {Array}					The list of tasks
	 */
	app.get('/tasks', function($){
		var tasks = $.db.import(__dirname + '/../models/task.js');

		tasks.findAll(criteria($.query))
			.then(function(data){
				$.data = data;
				$.json();
			})
			.catch(function(err){
				console.log('[sequelize] tasks:', err);
			});
	});

	/**
	 * Get a specific tasks by provided id
	 * @param  {integer}	{id}	The id of the task
	 * @return {object}				The details of the task
	 */
	app.get('/tasks/:id', function($){
		var tasks = $.db.import(__dirname + '/../models/task.js');
		
		var query = {
			where: {
				id: $.params.id
			}
		};

		tasks.findOne(query)
			.then(function(data){
				$.data = data;
				$.json();
			})
			.catch(function(err){
				console.log('[sequelize] tasks:', err);
			});
	});

	/**
	 * Creates a task
	 */
	app.post('/tasks', function($){
		var tasks = $.db.import(__dirname + '/../models/task.js');

		$.data = {
			success: true,
			data: null,
			errors: null
		};

		tasks.create($.body)
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

function criteria(query){
	var q = {};
	
	if(query.byProject){
		q.where = {
			project_id: query.byProject
		};
	}

	return q;
}