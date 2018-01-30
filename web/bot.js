var Botkit = require('botkit');
var express = require('express');
var http = require('http');
var debug = require('debug')('STARTER:web-bot:main');

module.exports = function (options) {

    if (!options.webserver) {
        throw new Error('WebChatbot: A web server is required for web socket');
    }

    var port = process.env.WEB_BOT_PORT || 3000;

    var webserver = options.webserver;

    webserver.use(express.static('web/public'));

    //Create controller
    debug('Creating controller...');
    // Create the Botkit controller, which controls all instances of the bot.
    var controller = Botkit.socketbot({ replyWithTyping: true });

    var server = http.createServer(webserver);

    server.listen(port, null, function () {
        debug('Web chatbot socket server configured and listening at http://localhost:' + port);
    });

    // Open the web socket server
    controller.openSocketServer(server);

    // Start the bot brain in motion!!
    controller.startTicking();

    //Use middlewares
    require('./middlewares')(controller);

    //Import skills
    require('./skills')(controller);

    //Define routes
    require('./routes')(webserver);

};