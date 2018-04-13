import 'reflect-metadata';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import { UserService } from './service/user';
import { MongoDBClient } from './utils/mongodb/client';

import TYPES from './constant/types';
import { ChuckNorrisJokeService } from './service/chuckNorrisJokeService';
import { IJokeService } from './service/jokeService';
import { WebController, FacebookController } from "botkit";
import * as botkit from "botkit";


// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
  let logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}

//Binds services
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<IJokeService>(TYPES.ChuckNorrisJokeService).to(ChuckNorrisJokeService);

//Binds and initialize a socketbot from botkit
let webController = botkit.socketbot({ replyWithTyping: true });
container.bind<WebController>(TYPES.WebController).toConstantValue(webController);

//Binds and initialize a facebook bot from botkit
let fbController = botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN
});
container.bind<FacebookController>(TYPES.FbController).toConstantValue(fbController);

export default container;