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