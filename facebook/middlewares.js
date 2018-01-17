var dialogflowToFbMiddleware = require('dialogflow-to-facebook-middleware')({});
var debug = require('debug')('starter:facebook-bot-middlewares');

//Middlewares are executed in the order they appear
module.exports = function (controller) {

    debug('Loading middlewares...');

    /*
        RECEIVE MIDDLEWARES
    */

    // Log every message received
    controller.middleware.receive.use(function (bot, message, next) {
        console.log('RECEIVED: ', message);
        message.logged = true;
        next();
    });

    //Init NLP module (dialogflow)
    debug('Configuring dialogflow middleware');
    var dialogflowMiddleware = require('botkit-middleware-dialogflow')({
        token: process.env.DIALOGFLOW
    });
    //Analyze with DialogFlow every message received
    controller.middleware.receive.use(dialogflowMiddleware.receive);

    //Every intent annotated with an 'action' will
    //be sent as Webhook
    var webHooks = require('../fulfillment/webhook-fulfillment-middleware')();
    controller.middleware.receive.use(webHooks.receive);

    //Every Facebook reply defined in DialogFlow 
    //ready to send to Facebook
    debug('Configuring dialogflow-to-facebook middleware');
    controller.middleware.receive.use(dialogflowToFbMiddleware.receive);

    /*
        SEND MIDDLEWARES
    */

    // Log every message sent
    controller.middleware.send.use(function (bot, message, next) {
        // log it
        console.log('SENT: ', message);
        // modify the message
        message.logged = true;
        // continue processing the message
        next();
    });
}