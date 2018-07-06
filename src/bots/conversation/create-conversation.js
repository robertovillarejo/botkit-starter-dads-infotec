var env = require('node-env-file');
var request = require('request');
var path = require('path');
const API_URL = 'https://api.dialogflow.com/v1/intents?v=20150910';

var envFile = path.join(__dirname, '../../.env');
env(envFile);

if (!process.env.DIALOGFLOW_DEVELOPER_TOKEN) {
    debug('For creating a conversation in DialogFlow a developer token is required');
    process.exit(1);
}

var DEVELOPER_TOKEN = process.env.DIALOGFLOW_DEVELOPER_TOKEN;
var intents = require('./starter-conversation');

intents.forEach(element => {
    request({
        method: 'POST',
        uri: API_URL + '&lang=es',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: element,
        json: true,
        auth: {
            bearer: DEVELOPER_TOKEN
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(element.name + ' intent successfully added!');
        } else {
            console.log(element.name + ' intent failed to add');
        }
    });
});