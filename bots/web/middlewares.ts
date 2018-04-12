import { WebController } from 'botkit';
import { logReceivedMessage, logSentMessage, dialogflowMiddleware } from './../common/middlewares';

const webRepliesConverter = require('replies-converter-botkit-middlewares').web;

export function configureMiddlewares(controller: WebController) {

    controller.middleware.receive.use(logReceivedMessage);
    controller.middleware.receive.use(dialogflowMiddleware.receive);
    controller.middleware.receive.use(webRepliesConverter.receive);
    controller.middleware.send.use(logSentMessage);

}