const replyAsDefinedInDialogFlow = (bot, message) => {
    if (message['webMessages']) {
        bot.startConversation(message, function (err, convo) {
            message['webMessages'].forEach(element => {
                convo.say(element);
            });
        });
    }
};

export { replyAsDefinedInDialogFlow };