var request = require('request'),
	_ = require('lodash'),
	xml2json = require('xml2json');

function CersTV(config) {

	this.config = _.extend(
		{
			host:'192.168.1.123',
			mac:'11:38:11:38:11:38',
			name:'node-cers-tv-client'
		},
		config
	);

}

CersTV.prototype = {

	register: function(done){

		var data = {
			name: this.config.name,
			registrationType: 'new',
			deviceId: "MediaRemote:"+this.config.mac
		};

		var options = {
			'uri': 'http://'+this.config.host+'/cers/api/register',
			'qs': data,
			'headers':{
				'User-Agent':'MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0',
				'X-CERS-DEVICE-INFO':'iPhone OS5.0.1/3.0.1/iPhone3,3',
				'X-CERS-DEVICE-ID':'MediaRemote:'+this.config.mac,
				'Connection':'close'
			}
		};

		request.get(options, done);
	},

	getRemoteCommandList: function(done){
		var options = {
			'uri': 'http://'+this.config.host+'/cers/api/getRemoteCommandList',
			'headers':{
				'User-Agent':'MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0',
				'X-CERS-DEVICE-INFO':'iPhone OS5.0.1/3.0.1/iPhone3,3',
				'X-CERS-DEVICE-ID':'MediaRemote:'+this.config.mac,
				'Connection':'close'
			}
		};
		request.get(options, done);
	},

	sendIrCommand: function(cmdCode, done){

		var builder = require('xmlbuilder');
		var xml = builder.create('s:Envelope')
			.att('xmlns:s', 'http://schemas.xmlsoap.org/soap/envelope/')
			.att('s:encodingStyle', 'http://schemas.xmlsoap.org/soap/encoding/')
			.ele('s:Body')
			.ele('u:X_SendIRCC', {'xmlns:u': 'urn:schemas-sony-com:service:IRCC:1'})
			.ele('IRCCCode', null, cmdCode)
			.end({ pretty: true});

		console.log(xml);

		var options = {
			'uri': 'http://'+this.config.host+'/IRCC',
			'headers':{
				'User-Agent':'TVSideView/2.0.1 CFNetwork/672.0.8 Darwin/14.0.0',
				// 'User-Agent':'MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0',
				'Content-Type':'text/xml; charset=utf-8',
				'SOAPAction':'"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
				'Content-Length':''+_byteCount(xml),
				'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'X-CERS-DEVICE-INFO':'iPhone OS5.0.1/3.0.1/iPhone3,3',
				'X-CERS-DEVICE-ID':'MediaRemote:'+this.config.mac,
				'Connection':'close'
			},
			'body':xml
		};

		// console.log(this.config);
		// console.log(options);

		request.post(options, done);

	}

};

function _byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

exports = module.exports = CersTV;