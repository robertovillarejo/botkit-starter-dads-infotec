var debug = require('debug')('STARTER:facebook-bot:fulfillment');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Do synchronous POST request
module.exports = function (config) {

    if (!config.url) {
        throw new Error('A url is required for webhook!');
    }

    var url = config.url;
    var token = process.env.TOKEN_FULFILLMENT;

    var middleware = {};

    //Do the webhook if the intent has an action defined
    middleware.receive = function (bot, message, next) {
        debug(message);
        if (message.nlpResponse && message.nlpResponse.result.action) {
            //TODO: validate message.nlpResponse against json schema
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, false);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.setRequestHeader('accept', 'application/json; charset=utf-8');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    debug('Webhook succesful to ' + url);
                    if (xhr.responseText && typeof xhr.responseText === 'string') {
                        var response = JSON.parse(xhr.responseText);
                        processResponse(response, message);
                    }
                }
            }
            xhr.send(JSON.stringify(message.nlpResponse));
        }
        next();
    };

    return middleware;
}

function processResponse(response, message) {

    if (!response) return;

    //TODO: validate response against json schema
    var result = message.nlpResponse.result;
    result.fulfillment.speech = response.speech || result.fulfillment.speech;
    result.fulfillment.messages = response.messages || result.fulfillment.messages;
    result.parameters = Object.assign(result.parameters, response.data);
    result.source = response.source || "fulfillment-system";

    debug('Parsed response from webhook:');
    debug(message.nlpResponse);
    return;
}