import { WebController } from 'botkit';

const replyAsDefinedInDialogFlow = (bot, message) => {
    if (message['webMessages']) {
        bot.startConversation(message, function (err, convo) {
            message['webMessages'].forEach(element => {
                convo.say(element);
            });
        });
    }
};

export function configureSkills(controller: WebController) {

    controller.on('message_received', replyAsDefinedInDialogFlow);

}