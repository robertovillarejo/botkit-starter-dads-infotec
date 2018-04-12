import { FacebookController } from 'botkit';

const replyAsDefinedInDialogFlow = function (bot, message) {
    if (message['fbMessages']) {
        bot.startConversation(message, function (err, convo) {
            message['fbMessages'].forEach(element => {
                convo.say(element);
            });
        });
    }
};

export function configureSkills(controller: FacebookController) {

    controller.on('message_received,facebook_postback', replyAsDefinedInDialogFlow);

}