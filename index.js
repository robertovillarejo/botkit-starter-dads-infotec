var env = require('node-env-file');
var debug = require('debug')('starter:main');

env(__dirname + '/.env');

//Init web server
var webserver = require('./web-server/express-server')({
    port: process.env.PORT || 3000
});

//Init facebook bot
require('./facebook/bot')({
    access_token: process.env.ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
    webserver: webserver
});
