var env = require('node-env-file');
var debug = require('debug')('starter:main');

env(__dirname + '/.env');

if (!process.env.DIALOGFLOW) {
    console.log('Error: Specify dialogflow in environment');
    process.exit(1);
}

if (!process.env.ACCESS_TOKEN) {
    console.log('Error: Specify the Facebook access_token in environment');
    process.exit(1);
}

if (!process.env.VERIFY_TOKEN) {
    console.log('Error: Specify the Facebook verify_token in environment');
    process.exit(1);
}

var dialogflowMiddleware = require('./node_modules/botkit-middleware-dialogflow')({
    token: process.env.DIALOGFLOW,
});

var webserver = require('./express-server')({
    port: process.env.PORT || 3000
});

require('./facebook/bot')({
    access_token: process.env.ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
    webserver: webserver,
    dialogflowMiddleware: dialogflowMiddleware
});