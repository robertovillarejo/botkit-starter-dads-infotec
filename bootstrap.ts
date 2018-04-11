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
import * as express from "express";
import * as botkit from "botkit";
import * as http from "http";
import * as path from "path";
import { WebController } from "botkit";
import { WebBot } from './bots/WebBot';

// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}

container.bind(WebBot).toSelf();
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<WebController>(TYPES.WebController).toConstantValue(botkit.socketbot({ replyWithTyping: true }));

// start the server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('port', 3000);
});

let app = server.build();
//app.listen(3000);

var controller: WebController = container.get(TYPES.WebController);
var httpServer = http.createServer(app);
httpServer.listen(3000);
controller.openSocketServer(httpServer);
controller.startTicking();

console.log('Server started on port 3000 :)');

exports = module.exports = app;