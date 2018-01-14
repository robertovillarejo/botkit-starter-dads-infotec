var dialogflowToFbMiddleware = require('dialogflow-to-facebook-middleware')({});

//Middlewares are executed in the order they appear
module.exports = function (controller, middlewares) {

    /*
        RECEIVE MIDDLEWARES
    */

    //Init NLP module (dialogflow)
    var dialogflowMiddleware = require('botkit-middleware-dialogflow')({
        token: process.env.DIALOGFLOW
    });

    controller.middleware.receive.use(dialogflowMiddleware.receive);

    // Log every message received
    controller.middleware.receive.use(function (bot, message, next) {
        console.log('RECEIVED: ', message);
        message.logged = true;
        next();
    });

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