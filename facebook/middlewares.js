var dialogflowToFbMiddleware = require('dialogflow-to-facebook-middleware')({});
var debug = require('debug')('starter:facebook-bot-middlewares');
var toSchema = require('../fulfillment/toSchema');

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
    var webHooks = require('../fulfillment/webhooks');
    controller.middleware.receive.use(function (bot, message, next) {
        if (message.nlpResponse && message.nlpResponse.result.action) {
            //Do the webhooks
            webHooks.trigger(
                'fulfillment', toSchema(message)
            );
            webHooks.getEmitter().on('fulfillment.success', function (shortname, statusCode, body) {
                console.log('Success on trigger webHook' + shortname + 'with status code', statusCode, 'and body', body);
            });
            webHooks.getEmitter().on('fulfillment.failure', function (shortname, statusCode, body) {
                console.log('Error on trigger webHook' + shortname + 'with status code', statusCode, 'and body', body);
            });
        }
        next();
    });

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