var CersTV = require('../lib/cersTV.js'),
	prompt = require('prompt');

prompt.start();

var prompt_options = [
	{
		'name':'host',
		'default':'192.168.1.241'
	},
	{
		'name':'mac',
		'default':'11:38:11:38:11:38'
	},
	{
		'name':'name',
		'default':'node-cers-tv-client'
	}
];

prompt.get(prompt_options, function (err, result) {
	var tv = new CersTV({host:result.host, mac:result.mac, name:result.name});

	// tv.register(function(err, res, body){
	// 	if(err) return console.log(err);
	// 	console.log('registered '+tv.config.mac);
	// });

	// tv.getRemoteCommandList(function(err, res, body){
	// 	if(err){
	// 		console.log(err);
	// 	}else if(body){
	// 		console.log(body);
	// 	}else{
	// 		console.log(res.statusCode);
	// 	}
	// });

	// var cmd = 'AAAAAgAAAJcAAAAjAw=='; //return
	// var cmd = 'AAAAAQAAAAEAAABgAw=='; //home	
	// var cmd = 'AAAAAQAAAAEAAAA6Aw=='; //display
	// var cmd = 'AAAAAQAAAAEAAAAvAw=='; //power
	// var cmd = 'AAAAAQAAAAEAAAAUAw=='; //mute
	// var cmd = 'AAAAAQAAAAEAAAAvAw=='; //power off (no worky)
	var cmd = 'AAAAAQAAAAEAAAA+Aw=='; // screen on/off (works)

	tv.sendIrCommand(cmd, function(err, res, body){
		if(err) return console.log(err);
		if(body) return console.log(body);
		console.log(res.statusCode);
	});

 //    Confirm		AAAAAQAAAAEAAABlAw==
 //    Up			AAAAAQAAAAEAAAB0Aw==
 //    Down		AAAAAQAAAAEAAAB1Aw==
 //    Right		AAAAAQAAAAEAAAAzAw==
 //    Left		AAAAAQAAAAEAAAA0Aw==
 //    Home		AAAAAQAAAAEAAABgAw==
 //    Options		AAAAAgAAAJcAAAA2Aw==
 //    Return		AAAAAgAAAJcAAAAjAw==
 //    Num1		AAAAAQAAAAEAAAAAAw==
 //    Num2		AAAAAQAAAAEAAAABAw==
 //    Num3		AAAAAQAAAAEAAAACAw==
 //    Num4		AAAAAQAAAAEAAAADAw==
 //    Num5		AAAAAQAAAAEAAAAEAw==
 //    Num6		AAAAAQAAAAEAAAAFAw==
 //    Num7		AAAAAQAAAAEAAAAGAw==
 //    Num8		AAAAAQAAAAEAAAAHAw==
 //    Num9		AAAAAQAAAAEAAAAIAw==
 //    Num0		AAAAAQAAAAEAAAAJAw==
 //    Num11		AAAAAQAAAAEAAAAKAw==
 //    Num12		AAAAAQAAAAEAAAALAw==
 //    Power		AAAAAQAAAAEAAAAVAw==
 //    Display		AAAAAQAAAAEAAAA6Aw==
 //    VolumeUp	AAAAAQAAAAEAAAASAw==
 //    VolumeDown	AAAAAQAAAAEAAAATAw==
 //    Mute		AAAAAQAAAAEAAAAUAw==

});