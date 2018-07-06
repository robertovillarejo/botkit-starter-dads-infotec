const replyAsDefinedInDialogFlow = function (bot, message) {
    if (message['fbMessages']) {
        bot.startConversation(message, function (err, convo) {
            message['fbMessages'].forEach(element => {
                convo.say(element, '');
            });
        });
    }
};

export { replyAsDefinedInDialogFlow };