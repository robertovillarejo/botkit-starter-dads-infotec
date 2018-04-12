import { FacebookController } from 'botkit';
import { logReceivedMessage, logSentMessage, dialogflowMiddleware } from './../common/middlewares';

const fbRepliesConverter = require('replies-converter-botkit-middlewares').facebook;

export function configureMiddlewares(controller: FacebookController) {

    //Receive
    controller.middleware.receive.use(logReceivedMessage);
    controller.middleware.receive.use(dialogflowMiddleware.receive);
    controller.middleware.receive.use(fbRepliesConverter.receive);

    //Send
    controller.middleware.send.use(logSentMessage);

}