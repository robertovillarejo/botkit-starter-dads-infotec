import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../constant/types';
import { FacebookController, FacebookBot } from 'botkit';
import { configureSkills } from './skills';
import { configureMiddlewares } from './middlewares';

@controller('bot/facebook')
export class FacebookBotConfigurer {

    private _controller: FacebookController;

    private _bot: FacebookBot;


    constructor(
        @inject(TYPES.FbController) fbController: FacebookController
    ) {
        this._controller = fbController;
        this._bot = this._controller.spawn();
        configureMiddlewares(this._controller);
        configureSkills(this._controller);
    }

}