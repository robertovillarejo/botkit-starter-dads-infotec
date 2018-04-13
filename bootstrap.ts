import { WebController, FacebookController } from 'botkit';
import 'reflect-metadata';

import container from "./installer";

import * as http from "http";

import TYPES from './constant/types';

import { InversifyExpressServer } from 'inversify-express-utils';

//Controllers
import './controller/fulfillment';
import './controller/user';
import './controller/home';
import './bots/web/WebBotConfigurer';
import './bots/facebook/FacebookBotConfigurer'

import { configureApp } from './configureApp';

const ip = require('ip');
const externalIp = ip.address();
const port = process.env.PORT;

//Configure the app
let server = new InversifyExpressServer(container);
server.setConfig(configureApp);

//Build the app
let app = server.build();

//container.bind(TYPES.webServer).toConstantValue(app);

//The http server
const httpServer: http.Server = http.createServer(app);
httpServer.listen(port);

//container.bind<http.Server>(TYPES.httpServer).toConstantValue(httpServer);

//Web controller
let webController: WebController = container.get(TYPES.WebController);
webController.openSocketServer(httpServer);
webController.startTicking();

//Facebook controller
let fbController: FacebookController = container.get(TYPES.FbController);
const bot = fbController.spawn();
fbController.createWebhookEndpoints(app, bot, () => {
  console.log('Facebook bot online!');
});

console.log(`Server successfully started on http://localhost:${port}`);
console.log(`Server successfully started on http://${externalIp}:${port}`);

exports = module.exports = app;