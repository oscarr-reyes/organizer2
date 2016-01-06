var diet   = require('diet'),
	static = require('./bin/diet-static');

var app = diet();

app.listen(3000);

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