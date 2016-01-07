var diet   = require('diet'),
	static = require('./bin/diet-static'),
	sequelize = require('sequelize');

var app = diet();

app.listen(3000);

app.header(function($){
	$.db = new sequelize('organizer', 'root', '3141', {
		host: '127.0.0.1',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	});

	$.return();
});

var files = static({
	path: app.path + '/static',
	index: false,
	showScriptName: false
});

app.footer(files, function($){
	if($.method == 'OPTIONS'){
		$.header('status', 200);
		$.end();
	}
});

require('./routes/users')(app);