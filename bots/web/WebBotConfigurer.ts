import { WebController } from "botkit";
import { inject, injectable } from "inversify";
import TYPES from "../../constant/types";
import { configureSkills } from "./skills";
import { configureMiddlewares } from "./middlewares";
import * as http from "http";

@injectable()
export class WebBotConfigurer {

    private controller: WebController;
    private httpServer: http.Server;

    constructor(
        @inject(TYPES.WebController) controller: WebController,
        @inject(TYPES.httpServer) httpServer: http.Server
    ) {
        this.controller = controller;
        this.httpServer = httpServer;
        this.controller.openSocketServer(this.httpServer);
        this.controller.startTicking();
        configureSkills(this.controller);
        configureMiddlewares(this.controller);
    }

}