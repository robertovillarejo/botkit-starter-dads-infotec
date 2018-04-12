const dialogflowMiddleware = require("botkit-middleware-dialogflow")({
    token: process.env.DIALOGFLOW_CLIENT_TOKEN
});

const logReceivedMessage = (bot, message, next) => {
    console.log('Message received');
    console.log(message);
    next();
};

const logSentMessage = (bot, message, next) => {
    console.log(message);
    next();
};

export { logReceivedMessage, logSentMessage, dialogflowMiddleware };