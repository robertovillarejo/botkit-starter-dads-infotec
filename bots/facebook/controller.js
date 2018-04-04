var debug = require('debug')('STARTER:facebook-bot:main');

module.exports = function (botkit, app) {

    //Create controller
    debug('Creating controller...');
    var controller = botkit.facebookbot({
        access_token: process.env.ACCESS_TOKEN,
        verify_token: process.env.VERIFY_TOKEN,
        port: process.env.PORT
    });

    //Create bot
    debug('Creating bot...');
    var bot = controller.spawn({});

    //Create webhook endpoint
    debug('Creating webhook endpoints');
    controller.createWebhookEndpoints(app, bot, function () {
        debug('Facebook chatbot is online!!');
    });

    return controller;

};