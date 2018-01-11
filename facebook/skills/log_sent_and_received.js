module.exports = function (controller) {
    // Log every message received
    controller.middleware.receive.use(function (bot, message, next) {
        // log it
        console.log('RECEIVED: ', message);
        // modify the message
        message.logged = true;
        // continue processing the message
        next();
    });

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