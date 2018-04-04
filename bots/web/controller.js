var debug = require('debug')('STARTER:web-bot:main');

module.exports = function (botkit, server) {

    if (!server) {
        throw new Error('An HTTP server is required!');
    }

    debug('Creating controller...');
    // Create the Botkit controller, which controls all instances of the bot.
    var controller = botkit.socketbot(
        {
            replyWithTyping: true
        });

    // Open the web socket server
    controller.openSocketServer(server);

    // Start the bot brain in motion!!
    controller.startTicking();

    return controller;

};