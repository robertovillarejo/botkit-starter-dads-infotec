'use strict'
var env = require('node-env-file');
var debug = require('debug')('STARTER:main');

debug('Initializing web server...');
var webserver = require('./web-server/express-server')({
    port: process.env.PORT || 8090
});

debug('Initializing Facebook bot...');
require('./facebook/bot')({
    access_token: process.env.ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
    webserver: webserver
});

debug('Initializing Facebook bot...');
require('./web/bot')({
    webserver: webserver
});
