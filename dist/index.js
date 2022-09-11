'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fetch from "node-fetch";
import { create } from "xmlbuilder2";
var _byteCount = function (s) {
    return encodeURI(s).split(/%..|./).length - 1;
};
var CersTVClient = /** @class */ (function () {
    function CersTVClient(host, macAddress, name, port, protocol) {
        var _this = this;
        this._protocol = 'http';
        this._port = 80;
        this._validate = function () {
            var rxMacAddress = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$');
            if (!_this._host)
                throw new Error('host is empty');
            if (!_this._macAddress)
                throw new Error('mac address is empty');
            if (!rxMacAddress.test(_this._macAddress))
                throw new Error('mac address improperly formatted');
            if (!_this._name)
                throw new Error('name is empty');
            if (_this._port < 0 || _this._port > 65535)
                throw new Error('port is out of range');
        };
        this._send = function (method, path, data) { return __awaiter(_this, void 0, void 0, function () {
            var uri, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "".concat(this._protocol, "://").concat(this._host, ":").concat(this._port, "/").concat(path);
                        options = {
                            method: method
                        };
                        if (data !== undefined)
                            options.body = data;
                        options.headers = [
                            ['Content-Type', 'application/json; charset=utf-8'],
                            ['User-Agent', 'MediaRemote/3.0.1 CFNetwork/548.0.4 Darwin/11.0.0'],
                            ['X-CERS-DEVICE-INFO', 'iPhone OS5.0.1/3.0.1/iPhone3,3'],
                            ['X-CERS-DEVICE-ID', "MediaRemote:".concat(this._macAddress)],
                            ['Connection', 'close']
                        ];
                        return [4 /*yield*/, fetch(uri, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.register = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            name: this._name,
                            registrationType: 'new',
                            deviceId: "MediaRemote:".concat(this._macAddress)
                        };
                        return [4 /*yield*/, this._send('GET', '/cers/api/register', JSON.stringify(data))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getRemoteCommandList = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._send('GET', '/cers/api/getRemoteCommandList')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.sendIrCommand = function (cmdCode) { return __awaiter(_this, void 0, void 0, function () {
            var xml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        xml = create('s:Envelope')
                            .att('xmlns:s', 'http://schemas.xmlsoap.org/soap/envelope/')
                            .att('s:encodingStyle', 'http://schemas.xmlsoap.org/soap/encoding/')
                            .ele('s:Body')
                            .ele('u:X_SendIRCC', { 'xmlns:u': 'urn:schemas-sony-com:service:IRCC:1' })
                            .ele('IRCCCode', cmdCode)
                            .end({ prettyPrint: true });
                        console.log(xml);
                        return [4 /*yield*/, this._send('POST', '/IRCC', xml)];
                    case 1: 
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
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this._host = host;
        this._macAddress = macAddress;
        this._name = name;
        if (port !== undefined)
            this._port = port;
        if (protocol !== undefined)
            this._protocol = protocol;
        this._validate();
    }
    return CersTVClient;
}());
;
export { CersTVClient };
