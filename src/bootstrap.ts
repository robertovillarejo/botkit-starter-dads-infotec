import 'reflect-metadata';
import container from "./installer";
import TYPES from './constant/types';
import { BotConfigurer } from './bots/common/iBotConfigurer';

const ip = require('ip');
const externalIp = ip.address();
const port = process.env.PORT;

//RAII (Resource Adquisition Is Initialization)
container.get(TYPES.httpServer);
container.get(TYPES.webServer);

//Configurers
let botConfigurers = container.getAll<BotConfigurer>(TYPES.BotConfigurer);
botConfigurers.forEach(configurer => {
    configurer.configureMiddlewares();
    configurer.configureSkills();
});

console.log(
    `Application is running! Access URLs:
Local: http://localhost:${port}
External: http://${externalIp}:${port}`);
