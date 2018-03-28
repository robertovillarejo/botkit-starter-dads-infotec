var debug = require('debug')('STARTER:facebook-bot:skills');

module.exports = function (controller) {

    debug('Loading skills...');

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controller.on('message_received,facebook_postback', function (bot, message) {
        if (message.fbMessages) {
            bot.startConversation(message, function (err, convo) {
                message.fbMessages.forEach(element => {
                    convo.say(element);
                });
            });
        }
    });
}