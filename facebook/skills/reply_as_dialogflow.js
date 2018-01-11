module.exports = function(controller) {

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controller.on('message_received', function(bot, message) {
        if (message.fbResponse) {
            bot.replyWithTyping(message, message.fbResponse);
        }
    });
}