// Index for creating bots
var botkit = require('botkit');
var webController = require('./web/controller');
var webMiddlewares = require('./web/middlewares');
var webSkills = require('./web/skills');

var fbController = require('./facebook/controller');
var fbMiddlewares = require('./facebook/middlewares');
var fbSkills = require('./facebook/skills');
var fbMenu = require('./facebook/menu');

//Creating web bot
function createWebBot(botkit, server) {
    var controller = webController(botkit, server);
    webMiddlewares(controller);
    webSkills(controller);
}

//Creating Facebook bot
function createFbBot(botkit, app) {
    var controller = fbController(botkit, app);
    fbMiddlewares(controller);
    fbSkills(controller);
    fbMenu(controller);
}

module.exports = function (server, app) {
    createWebBot(botkit, server);
    createFbBot(botkit, app);
}