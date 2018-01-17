var Botkit = require('botkit');
var debug = require('debug')('STARTER:facebook-bot');

module.exports = function (options) {

    if (!options.access_token) {
        throw new Error('FacebookBot: access_token not provided!');
    }

    if (!options.verify_token) {
        throw new Error("FacebookBot: verify_token not provided!");
    }

    if (!options.webserver) {
        throw new Error('FacebookBot: A web server is required for Facebook webhook');
    }

    //Create controller
    debug('Creating controller...');
    var controller = Botkit.facebookbot({
        access_token: options.access_token,
        verify_token: options.verify_token,
        port: options.webserver.get('port')
    });

    //Create bot
    debug('Creating bot...');
    var bot = controller.spawn({});   

    //Assign web server to controller
    controller.webserver = options.webserver;

    //Create webhook endpoint
    debug('Creating webhook endpoint');
    controller.createWebhookEndpoints(controller.webserver, bot, function () {
        debug('Facebook chatbot is online!!');
    });

    //Use middlewares
    require('./middlewares')(controller);

    //Import skills
    require('./skills')(controller); 

};