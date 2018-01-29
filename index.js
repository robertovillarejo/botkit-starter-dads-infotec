var env = require('node-env-file');
var debug = require('debug')('STARTER:main');

env(__dirname + '/.env');

debug('Initializing web server...');
//Init web server
var webserver = require('./web-server/express-server')({
    port: process.env.PORT || 8090
});

debug('Initializing Facebook bot...');
//Init facebook bot
/*require('./facebook/bot')({
    access_token: process.env.ACCESS_TOKEN,
    verify_token: process.env.VERIFY_TOKEN,
    webserver: webserver
});*/

//Init web chatbot
require('./web/bot')({
    webserver: webserver
});
