const dialogflowMiddleware = require("botkit-middleware-dialogflow")({
    token: process.env.DIALOGFLOW_CLIENT_TOKEN
});

const logMessage = {
    receive: (bot, message, next) => {
        console.log('Message received:');
        console.log(message);
        next();
    },
    send: (bot, message, next) => {
        console.log('Message sent:');
        console.log(message);
        next();
    }
}

export { logMessage, dialogflowMiddleware };