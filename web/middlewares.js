var dialogflowFbToWebMiddleware = require('dialogflow-facebook-to-web-middleware')({});
var debug = require('debug')('STARTER:web-bot:middlewares');

//Middlewares are executed in the order they appear
module.exports = function (controller) {

    debug('Loading middlewares...');

    /*
        RECEIVE MIDDLEWARES
    */

    // Log every message received
    controller.middleware.receive.use(function (bot, message, next) {
        debug('Message received')
        debug(message);
        message.logged = true;
        next();
    });

    //Init NLP module (dialogflow)
    debug('Configuring dialogflow middleware');
    var dialogflowMiddleware = require('botkit-middleware-dialogflow')({
        token: process.env.DIALOGFLOW_CLIENT_TOKEN
    });
    //Analyze with DialogFlow every message received
    controller.middleware.receive.use(dialogflowMiddleware.receive);

    //Every Facebook reply defined in DialogFlow 
    //ready to send to Facebook
    debug('Configuring dialogflow-facebook-to-web middleware');
    controller.middleware.receive.use(dialogflowFbToWebMiddleware.receive);

    /*
        SEND MIDDLEWARES
    */

    // Log every message sent
    controller.middleware.send.use(function (bot, message, next) {
        debug('Message sent')
        debug(message);
        message.logged = true;
        next();
    });
}