var rp = require('request-promise');
var toSchema = require('./toSchema');
var debug = require('debug')('starter:facebook-bot-middlewares');

module.exports = function (config) {
    var middleware = {};

    middleware.receive = function (bot, message, next) {
        if (message.nlpResponse && message.nlpResponse.result.action) {
            var options = {
                uri: 'http://localhost:8090/fulfillment',
                json: true,
                method: 'POST',
                body: toSchema(message)
            };

            timeout(rp(options), 5000)
                .then(function () {
                    debug('Success on webhook');
                })
                .catch(function (err) {
                    debug('Fail on webhook');
                });
        }
        next();
    };

    return middleware;
}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function timeout(promise, milliseconds) {
    return Promise.race(
        [promise, wait(milliseconds).then(() => {
            throw new Error("Timeout after " + milliseconds + " ms");
        })]);
}