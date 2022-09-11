const prompt = require('prompt-async');
const	wol = require('wake_on_lan');
const { CersTVClient } = require('../../dist/index');

const functionalTest = async () => {
	prompt.start();

	var prompt_options = [
		{
			'name':'host',
			'default':'192.168.1.23'
		},
		{
			'name':'mac',
			'default':'00:A0:96:84:FC:A0'
		}
	];

	const { host, macAddress } = await prompt.get(prompt_options);

	const tv = new CersTVClient(host, macAddress, 'test');

	wol.wake(macAddress, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('complete');
		}
	});

	tv.getRemoteCommandList().then((data) =>{
		console.log(data);
	});

	// tv.sendIrCommand(cmd, function(err, res, body){
	// 	if(err) return console.log(err);
	// 	if(body) return console.log(body);
	// 	console.log(res.statusCode);
	// });
};

functionalTest();