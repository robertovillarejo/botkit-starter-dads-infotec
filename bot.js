var env = require('node-env-file');
env(__dirname + '/.env');

if (!process.env.dialogflow) {
    console.log('Error: Specify dialogflow in environment');
    process.exit(1);
}

if (!process.env.access_token) {
    console.log('Error: Specify the Facebook access_token in environment');
    process.exit(1);
}

if (!process.env.verify_token) {
    console.log('Error: Specify the Facebook verify_token in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    debug: true,
    dialogflow: process.env.dialogflow,
    access_token: process.env.access_token,
    verify_token: process.env.verify_token,
    portFb: process.env.port_fb || 3000
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Facebook bot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var controllerFb = Botkit.facebookbot({
    access_token: bot_options.access_token,
    verify_token: bot_options.verify_token
});

//Import facebook skills
var normalizedPath = require("path").join(__dirname, "skills/facebook");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/facebook/" + file)(controllerFb);
});

var botFb = controllerFb.spawn({});

//Configure web server and create webhook endpoint
controllerFb.setupWebserver(bot_options.portFb, function(err, webserver){
    controllerFb.createWebhookEndpoints(controllerFb.webserver, botFb, function() {
        console.log('Facebook chatbot is online!!');
    });
});

//Configure middlewares
var dialogflowMiddleware = require('./node_modules/botkit-middleware-dialogflow')({
    token: bot_options.dialogflow,
});
var dialogflowToSlackMiddleware = require('./node_modules/dialogflow-to-slack-middleware')({});
var dialogflowtoFbMiddleware = require('./node_modules/dialogflow-to-facebook-middleware')({});
//This will send every message to dialogflow
controllerFb.middleware.receive.use(dialogflowMiddleware.receive);
//This will convert every response defined in dialogflow to Facebook format
controllerFb.middleware.receive.use(dialogflowtoFbMiddleware.receive);