'use strict';

import fetch from "node-fetch";
import { RequestInit } from "node-fetch";
import { create } from "xmlbuilder2";

type Protocol = 'http' | 'https';

enum Command {
	Power =				'AAAAAQAAAAEAAAAVAw==',
	PowerOff = 		'AAAAAQAAAAEAAAAvAw==',
	ToggleScreen = 'AAAAAQAAAAEAAAA+Aw==',
	Confirm =			'AAAAAQAAAAEAAABlAw==',
	Up =					'AAAAAQAAAAEAAAB0Aw==',
	Down = 				'AAAAAQAAAAEAAAB1Aw==',
	Right =				'AAAAAQAAAAEAAAAzAw==',
	Left =				'AAAAAQAAAAEAAAA0Aw==',
	Home =				'AAAAAQAAAAEAAABgAw==',
	Options =			'AAAAAgAAAJcAAAA2Aw==',
	Return =			'AAAAAgAAAJcAAAAjAw==',
	Display =			'AAAAAQAAAAEAAAA6Aw==',
	VolumeUp =		'AAAAAQAAAAEAAAASAw==',
	VolumeDown =	'AAAAAQAAAAEAAAATAw==',
	Mute =				'AAAAAQAAAAEAAAAUAw==',
	Num1 =				'AAAAAQAAAAEAAAAAAw==',
	Num2 =				'AAAAAQAAAAEAAAABAw==',
	Num3 =				'AAAAAQAAAAEAAAACAw==',
	Num4 =				'AAAAAQAAAAEAAAADAw==',
	Num5 =				'AAAAAQAAAAEAAAAEAw==',
	Num6 =				'AAAAAQAAAAEAAAAFAw==',
	Num7 =				'AAAAAQAAAAEAAAAGAw==',
	Num8 =				'AAAAAQAAAAEAAAAHAw==',
	Num9 =				'AAAAAQAAAAEAAAAIAw==',
	Num0 =				'AAAAAQAAAAEAAAAJAw==',
	Num11 =				'AAAAAQAAAAEAAAAKAw==',
	Num12 =				'AAAAAQAAAAEAAAALAw=='
}

const _byteCount = (s:string) => {
  return encodeURI(s).split(/%..|./).length - 1;
}

class CersTVClient{
	protected readonly _protocol:Protocol = 'http';
	protected readonly _host:string;
	protected readonly _port:number = 80;
	protected readonly _macAddress:string;
	protected readonly _name:string;

	constructor(host:string, macAddress:string, name:string, port?:number, protocol?:Protocol) {
		this._host = host;
		this._macAddress = macAddress;
		this._name = name;
		if (port !== undefined) this._port = port;
		if (protocol !== undefined) this._protocol = protocol;

		this._validate();
	}

	protected _validate = () => {
		const rxMacAddress = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$');

    if(!this._host) throw new Error('host is empty');
    if(!this._macAddress) throw new Error('mac address is empty');
		if(!rxMacAddress.test(this._macAddress)) throw new Error('mac address is malformed')
    if(!this._name) throw new Error('name is empty');
    if(this._port < 0 || this._port > 65535) throw new Error('port is out of range');
  };

	protected _send = async (method:string, path:string, data?:string) => {
    const uri = `${this._protocol}://${this._host}:${this._port}/${path}`;
    const options:RequestInit = {
      method: method
    }
		if(data !== undefined) options.body = data;

		options.headers = [
			['Content-Type','application/json; charset=utf-8'],
			['User-Agent','MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0'],
			['X-CERS-DEVICE-INFO','iPhone OS5.0.1/3.0.1/iPhone3,3'],
			['X-CERS-DEVICE-ID',`MediaRemote:${this._macAddress}`],
			['Connection','close']
		];

    return await fetch(uri, options);
  }

	register = async () => {
		const data = {
			name: this._name,
			registrationType: 'new',
			deviceId: `MediaRemote:${this._macAddress}`
		};

		return await this._send('POST', '/cers/api/register', JSON.stringify(data));
	}

	getRemoteCommandList = async () => {
		return await this._send('GET', '/cers/api/getRemoteCommandList');
	};

	sendIrCommand = async (cmdCode:Command) => {

		const xml = create('s:Envelope')
			.att('xmlns:s', 'http://schemas.xmlsoap.org/soap/envelope/')
			.att('s:encodingStyle', 'http://schemas.xmlsoap.org/soap/encoding/')
			.ele('s:Body')
			.ele('u:X_SendIRCC', {'xmlns:u': 'urn:schemas-sony-com:service:IRCC:1'})
			.ele('IRCCCode', cmdCode)
			.end({ prettyPrint: true });

		console.log(xml);

		// const headers = {
		// 	'User-Agent':'TVSideView/2.0.1 CFNetwork/672.0.8 Darwin/14.0.0',
		// 	// 'User-Agent':'MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0',
		// 	'Content-Type':'text/xml; charset=utf-8',
		// 	'SOAPAction':'"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
		// 	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		// 	'X-CERS-DEVICE-INFO':'iPhone OS5.0.1/3.0.1/iPhone3,3',
		// 	'X-CERS-DEVICE-ID':`MediaRemote:${this._macAddress}`,
		// 	'Connection':'close',
		// 	'Content-Length':''+_byteCount(xml)
		// }

		return await this._send('POST', '/IRCC', xml);
	}

};


export { CersTVClient };