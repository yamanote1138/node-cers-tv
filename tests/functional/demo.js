var prompt = require('prompt'),
	wol = require('wake_on_lan');

prompt.start();

var prompt_options = [
	{
		'name':'mac',
		'default':'00:A0:96:84:FC:A0'
	}
];

prompt.get(prompt_options, function (err, result) {
	wol.wake('20:DE:20:DE:20:DE', function(error) {
		if (error) {
			console.log(error);
		} else {
			console.log('complete');
		}
	});
});

tv.sendIrCommand(cmd, function(err, res, body){
	if(err) return console.log(err);
	if(body) return console.log(body);
	console.log(res.statusCode);
});
