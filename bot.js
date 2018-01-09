/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Slack bot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require('node-env-file');
env(__dirname + '/.env');

if (!process.env.slackToken) {
    console.log('Error: Specify Slack token in environment');
    process.exit(1);
}

if (!process.env.dialogflow) {
    console.log('Error: Specify dialogflow in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

var bot_options = {
    slackToken: process.env.slackToken,
    debug: true,
    dialogflow: process.env.dialogflow
};

// Use a mongo database if specified, otherwise store in a JSON file local to the app.
// Mongo is automatically configured when deploying to Heroku
if (process.env.MONGO_URI) {
    var mongoStorage = require('botkit-storage-mongo')({mongoUri: process.env.MONGO_URI});
    bot_options.storage = mongoStorage;
} else {
    bot_options.json_file_store = __dirname + '/.data/db/'; // store user data in a simple JSON format
}

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot({debug: bot_options.debug});

var bot = controller.spawn({
    token: bot_options.slackToken
});

var dialogflowMiddleware = require('./node_modules/botkit-middleware-dialogflow')({
    token: bot_options.dialogflow,
});

var dialogflowToSlackMiddleware = require('./node_modules/dialogflow-to-slack-middleware')({});

controller.middleware.receive.use(dialogflowMiddleware.receive);
controller.middleware.receive.use(dialogflowToSlackMiddleware.receive);

bot.startRTM();

// Log every message sent
controller.middleware.send.use(function(bot, message, next) {
    // log it
    console.log('SENT: ', message);
    // modify the message
    message.logged = true;
    // continue processing the message
    next();
  });
  
  // Log every message recieved
  controller.middleware.receive.use(function(bot, message, next) {
    // log it
    console.log('RECEIVED: ', message);
    // modify the message
    message.logged = true;
    // continue processing the message
    next();
  });
  
  
  //Response to user with reply defined in DialogFlow
  controller.on('direct_message', function(bot, message) {
    bot.reply(message, message.slackResponse);
  });

// Set up an Express-powered webserver to expose oauth and webhook endpoints
//var webserver = require(__dirname + '/components/express_webserver.js')(controller);