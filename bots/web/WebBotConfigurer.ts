import { WebController } from "botkit";
import { inject } from "inversify";
import TYPES from "../../constant/types";
import { controller } from "inversify-express-utils";
import { configureSkills } from "./skills";
import { configureMiddlewares } from "./middlewares";
//import * as http from "http";

@controller('/bot/web')
export class WebBotConfigurer {

    private _controller: WebController;
    //private httpServer: any;

    constructor(
        @inject(TYPES.WebController) controller: WebController,
        //@inject(TYPES.httpServer) httpServer: http.Server
    ) {
        this._controller = controller;
        //this.httpServer = httpServer;
        configureSkills(this._controller);
        configureMiddlewares(this._controller);
    }

}