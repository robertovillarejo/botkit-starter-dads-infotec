module.exports = function(controllerFb) {

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controllerFb.on('message_received', function(bot, message) {
        bot.replyWithTyping(message, message.fbResponse);
    });

}