import 'reflect-metadata';
import container from "./installer";
import TYPES from './constant/types';

const ip = require('ip');
const externalIp = ip.address();
const port = process.env.PORT;

//RAII (Resource Adquisition Is Initialization)
container.get(TYPES.httpServer);
container.get(TYPES.webServer);
//Configurers
container.get(TYPES.webBotConfigurer);
container.get(TYPES.fbBotConfigurer);
container.get(TYPES.FbController);

console.log(`Server successfully started on http://localhost:${port}`);
console.log(`Server successfully started on http://${externalIp}:${port}`);
