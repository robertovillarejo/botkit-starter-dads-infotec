import { inject, injectable } from 'inversify';
import TYPES from '../../constant/types';
import * as express from 'express';
import { FacebookController, FacebookBot } from 'botkit';
import { replyAsDefinedInDialogFlow } from "./skills";
import { logMessage, dialogflowMiddleware } from './../common/middlewares';
import { BotConfigurer } from '../common/iBotConfigurer';
const fbRepliesConverter = require('replies-converter-botkit-middlewares').facebook;

@injectable()
export class FacebookBotConfigurer implements BotConfigurer {

    private controller: FacebookController;
    private bot: FacebookBot;

    constructor(
        @inject(TYPES.FbController) fbController: FacebookController,
        @inject(TYPES.webServer) app: express.Application
    ) {
        this.controller = fbController;
        this.bot = fbController.spawn();
        fbController.createWebhookEndpoints(app, this.bot, () => {
            console.log('Facebook bot online!');
        });
    }

    configureSkills() {
        this.controller
            .on('message_received,facebook_postback', replyAsDefinedInDialogFlow);
    }

    configureMiddlewares() {
        //Receive
        this.controller.middleware.receive.use(logMessage.receive);
        this.controller.middleware.receive.use(dialogflowMiddleware.receive);
        this.controller.middleware.receive.use(fbRepliesConverter.receive);

        //Send
        this.controller.middleware.send.use(logMessage.send);
    }

}