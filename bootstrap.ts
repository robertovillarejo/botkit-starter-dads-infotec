import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import TYPES from './constant/types';
import { UserService } from './service/user';
import { MongoDBClient } from './utils/mongodb/client';
import './controller/fulfillment';
import './controller/user';
import './bots/web/WebBotConfigurer';
import './bots/facebook/FacebookBotConfigurer'
import * as express from "express";
import * as botkit from "botkit";
import * as http from "http";
import * as path from "path";
import { WebController, FacebookController } from "botkit";

// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}

//Binds services
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<UserService>(TYPES.UserService).to(UserService);

//Binds and initialize a socketbot from botkit
let webController = botkit.socketbot({ replyWithTyping: true });
container.bind<WebController>(TYPES.WebController).toConstantValue(webController);

//Binds and initialize a facebook bot from botkit
let fbController = botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN
});
container.bind<FacebookController>(TYPES.FbController).toConstantValue(fbController);

//Configure the app
const port = process.env.PORT;
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('port', port);
});

//Build the app
let app = server.build();

container.bind(TYPES.webServer).toConstantValue(app);

//The http server
const httpServer = http.createServer(app);
httpServer.listen(port);

//Web controller
webController.openSocketServer(httpServer);
webController.startTicking();

//Facebook controller
const bot = fbController.spawn();
fbController.createWebhookEndpoints(app, bot, () => {
  console.log('Facebook bot online!');
});

console.log(`Server successfully started on http://localhost:${port}`);

exports = module.exports = app;