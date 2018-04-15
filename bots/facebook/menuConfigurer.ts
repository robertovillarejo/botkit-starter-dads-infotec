import { FacebookController } from "botkit";

module.exports = function (controller: FacebookController) {
    controller.api.messenger_profile.greeting('!Hola! Soy el chatbot de STARTER');
    controller.api.messenger_profile.get_started('Hola');
    controller.api.messenger_profile.menu([{
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
            {
                "title": "Menú",
                "type": "nested",
                "call_to_actions": [
                    {
                        "title": "Información general",
                        "type": "postback",
                        "payload": "Información general"
                    },
                    {
                        "title": "Hablar con un humano",
                        "type": "postback",
                        "payload": "Hablar con un humano"
                    },
                    {
                        "title": "Creadores del chatbot",
                        "type": "postback",
                        "payload": "¿Quienes son tus creadores?"
                    }
                ]
            },
            {
                "type": "web_url",
                "title": "STARTER",
                "url": "https://github.com/robertovillarejo/botkit-starter-dads-infotec",
                "webview_height_ratio": "full"
            }
        ]
    }
    ]);

}