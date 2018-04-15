import { FacebookBotConfigurer } from './bots/facebook/FacebookBotConfigurer';
import { WebBotConfigurer } from './bots/web/WebBotConfigurer';
import 'reflect-metadata';
import * as http from "http";
import { InversifyExpressServer } from 'inversify-express-utils';
import { configureApp } from './configureApp';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

import TYPES from './constant/types';
import { ChuckNorrisJokeService } from './service/chuckNorrisJokeService';
import { IJokeService } from './service/jokeService';
import { WebController, FacebookController } from "botkit";
import * as botkit from "botkit";

//Controllers
import './controller/fulfillment';
import './bots/web/WebBotConfigurer';
import './bots/facebook/FacebookBotConfigurer'

const port = process.env.PORT;

let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}

//Services
container.bind<IJokeService>(TYPES.ChuckNorrisJokeService).to(ChuckNorrisJokeService);

//Express app
let server = new InversifyExpressServer(container);
server.setConfig(configureApp);
let app = server.build();
//HTTP server
const httpServer: http.Server = http.createServer(app);
httpServer.listen(port);

container.bind(TYPES.webServer).toConstantValue(app);
container.bind<http.Server>(TYPES.httpServer).toConstantValue(httpServer);

//SocketBot
let webController = botkit.socketbot({ replyWithTyping: true });
container.bind<WebController>(TYPES.WebController).toConstantValue(webController);
container.bind(TYPES.webBotConfigurer).to(WebBotConfigurer);

//FacebookBot
let fbController = botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN
});
container.bind<FacebookController>(TYPES.FbController).toConstantValue(fbController);
container.bind(TYPES.fbBotConfigurer).to(FacebookBotConfigurer);

export default container;