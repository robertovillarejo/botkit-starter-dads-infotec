module.exports = function (controller) {

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controller.on('message_received', function (bot, message) {
        bot.startConversation(message, function (err, convo) {
            message.fbMessages.forEach(element => {
                convo.say(element);
            });
        });
    });
}