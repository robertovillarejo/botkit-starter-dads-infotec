import { inject, injectable } from 'inversify';
import TYPES from '../../constant/types';
import { FacebookController } from 'botkit';
import { configureSkills } from './skills';
import { configureMiddlewares } from './middlewares';

@injectable()
export class FacebookBotConfigurer {

    private controller: FacebookController;

    constructor(
        @inject(TYPES.FbController) fbController: FacebookController
    ) {
        this.controller = fbController;
        configureMiddlewares(this.controller);
        configureSkills(this.controller);
    }

}