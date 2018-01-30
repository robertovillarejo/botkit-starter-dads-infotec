var debug = require('debug')('STARTER:web-bot:skills');

module.exports = function (controller) {

    debug('Loading skills...');

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controller.on('message_received', function (bot, message) {
        if (message.webMessages) {
            //bot.startConversation(message, function (err, convo) {
                message.webMessages.forEach(element => {
                    //convo.say(element);
                    bot.reply(message, element);
                });
            //});
        }
    });
}