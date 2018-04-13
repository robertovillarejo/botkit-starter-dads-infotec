import { inject, injectable } from 'inversify';
import TYPES from '../../constant/types';
import * as express from 'express';
import { FacebookController, FacebookBot } from 'botkit';
import { configureSkills } from './skills';
import { configureMiddlewares } from './middlewares';

@injectable()
export class FacebookBotConfigurer {

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
        configureMiddlewares(this.controller);
        configureSkills(this.controller);
    }

}