import { WebController } from "botkit";
import { inject } from "inversify";
import TYPES from "../../constant/types";
import { controller } from "inversify-express-utils";
import { configureSkills } from "./skills";
import { configureMiddlewares } from "./middlewares";

@controller('/bot/web')
export class WebBotConfigurer {

    private _controller: WebController;

    constructor(@inject(TYPES.WebController) controller: WebController) {
        this._controller = controller;
        configureSkills(this._controller);
        configureMiddlewares(this._controller);
    }

}