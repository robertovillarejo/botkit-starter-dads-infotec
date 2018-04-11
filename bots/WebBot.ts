import { WebController } from "botkit";
import { inject, injectable } from "inversify";
import TYPES from "../constant/types";
import { controller } from "inversify-express-utils";

//@injectable()
@controller('/bot/web')
export class WebBot {

    private _controller: WebController;

    constructor(@inject(TYPES.WebController) controller: WebController) {
        this._controller = controller;
        this.configureMiddlewares();
        this.configureSkills();
    }

    public configureMiddlewares(): void {
        var dialogflowMiddleware = require("botkit-middleware-dialogflow")({
            token: "fda8a69f25c543a6a582f440d38fb572"
        });
        this._controller.middleware.receive.use((bot, message, next) => {
            console.log('Message received');
            console.log(message);
            next();
        });
        this._controller.middleware.receive.use(dialogflowMiddleware.receive);
        var webRepliesConverter = require('replies-converter-botkit-middlewares').web;
        this._controller.middleware.receive.use(webRepliesConverter.receive);
        this._controller.middleware.send.use((bot, message, next) => {
            console.log(message);
            next();
        });
    }

    public configureSkills(): void {
        this._controller.on('message_received', (bot, message) => {
            if (message['webMessages']) {
                bot.startConversation(message, function (err, convo) {
                    message['webMessages'].forEach(element => {
                        convo.say(element);
                    });
                });
            }
        });
    }
}