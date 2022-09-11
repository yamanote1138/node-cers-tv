cers-tv 
[![Build](https://github.com/yamanote1138/node-cers-tv/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/yamanote1138/node-cers-tv/actions/workflows/build-and-test.yml)
![License](https://img.shields.io/npm/l/cers-tv)
![NPM Version](https://img.shields.io/npm/v/cers-tv)
=============

node client to connect to a CERS-compatible TV


## NONE OF THIS WORKS!
The only tv I have to test this with is a `BRAVIA KDL-55EX723`. It's old the on-board software is super-stale, the api documentation is impossible to find, and the wi-fi connection is flaky (at best) on modern routers. As such, this module (and the docs below) are simply provided for posterity.

## Usage

### Installation
`npm i cers-tv`

### Instantiation
setup, configure and connect
```javascript
'use strict';
import { CersTVClient, Command } from 'cers-tv';

const tv = new CersTVClient(
  '192.168.1.21', // host (required) - ip address of tv
  '11:38:11:38:11:38', // macAddress (required) - bogus mac address to use in validation step / binding)
  'node-cers-remote', // name (required) - how remote will identify itself in TV ui
  1138, // port (optional), defaults to 80
  'http' // protocol (optional), defaults to 'http'
);
```

### Registering
```javascript
tv.register().then(() =>{
  //do something
})
```

### Get List of Remote Commands
```javascript
tv.getRemoteCommandList().then((data) =>{
  console.log(data);
});	
```

### Sending IR Commands
```javascript
tv.sendIrCommand(Command.Power).then((res) => {
  console.log(res);
});
```