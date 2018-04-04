var debug = require('debug')('STARTER:web-bot:skills');

module.exports = function (controller) {

    debug('Loading skills...');

    //Reply every message_received with fbResponse 
    //produced by dialogflow-to-facebook-middleware
    controller.on('message_received', function (bot, message) {
        if (message.webMessages) {
            bot.startConversation(message, function (err, convo) {
                message.webMessages.forEach(element => {
                    convo.say(element);
                });
            });
        }
    });

    controller.on('hello', (bot, message) => {
        bot.startConversation(message, (err, convo) => {
            if (!err) {
                convo.say('¡Hola! Soy un bot demo');
                convo.say('Por ahora, solo vivo en un ambiente web pero me puedes conectar a otras plataformas como Facebook');
                convo.say({
                    text: '¡Puedo enviarte imágenes!',
                    files: [
                        {
                            url: 'https://www.infotec.mx/work/models/infotec/design_2015/images/logo_infotec.png',
                            image: true
                        }
                    ]
                });
                convo.say({
                    text: '¡Puedo enviarte links!',
                    files: [
                        {
                            url: 'https://www.infotec.mx/'
                        }
                    ]
                });
                convo.say({
                    text: '¡Puedo enviarte botones!',
                    quick_replies: [
                        {
                            title: '¡Gracias!',
                            payload: 'gracias'
                        }
                    ]
                });
            }
        })
    });

    controller.on('welcome_back', (bot, message) => {
        bot.startConversation(message, (err, convo) => {
            convo.say('Hola de nuevo :)');
        })
    });
}