import { controller } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../constant/types';
import { FacebookController } from 'botkit';
import { configureSkills } from './skills';
import { configureMiddlewares } from './middlewares';

@controller('bot/facebook')
export class FacebookBotConfigurer {

    private _controller: FacebookController;

    constructor(
        @inject(TYPES.FbController) fbController: FacebookController
    ) {
        this._controller = fbController;
        configureMiddlewares(this._controller);
        configureSkills(this._controller);
    }

}