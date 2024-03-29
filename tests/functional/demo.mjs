import prompt from 'prompt';
// import { wake } from 'wake_on_lan';
import { CersTVClient, Command } from '../../dist/index.js';

const functionalTest = async () => {
	prompt.start();

	const prompt_options = [
		{
			'name':'host',
			'default':'192.168.1.23'
		},
		{
			'name':'macAddress',
			'default':'00:A0:96:84:FC:A0'
		}
	];

	const { host, macAddress } = await prompt.get(prompt_options);

	console.log(`host set to ${host}`);
	console.log(`mac address set to ${macAddress}`);
	console.log(`power command is: ${Command.Power}`);

	const tv = new CersTVClient(host, '11:38:11:38:11:38', 'node cers client');

	tv.register().then(() =>{
		tv.getRemoteCommandList().then((data) =>{
			console.log(data);
		});	
	})

	// wake(macAddress, (error) => {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log('complete');
	// 	}
	// });


	tv.sendIrCommand(Command.Power).then((res) => {
		console.log(res);
	});
};

functionalTest();