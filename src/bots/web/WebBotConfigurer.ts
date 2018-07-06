import { WebController } from "botkit";
import { inject, injectable } from "inversify";
import TYPES from "../../constant/types";
import { replyAsDefinedInDialogFlow } from "./skills";
import * as http from "http";
import { logMessage, dialogflowMiddleware } from './../common/middlewares';
const webRepliesConverter = require('replies-converter-botkit-middlewares').web;

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
        this.configureSkills();
        this.configureMiddlewares();
    }

    private configureSkills() {
        this.controller
        .on('message_received', replyAsDefinedInDialogFlow);
    }

    private configureMiddlewares() {
        this.controller.middleware.receive.use(logMessage.receive);
        this.controller.middleware.receive.use(dialogflowMiddleware.receive);
        this.controller.middleware.receive.use(webRepliesConverter.receive);
        this.controller.middleware.send.use(logMessage.send);
    }

}