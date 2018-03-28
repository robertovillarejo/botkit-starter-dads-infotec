// Index for creating bots
var webController = require('./web/controller');
var webMiddlewares = require('./web/middlewares');
var webSkills = require('./web/skills');

var fbController = require('./facebook/controller');
var fbMiddlewares = require('./facebook/middlewares');
var fbSkills = require('./facebook/skills');
var fbMenu = require('./facebook/menu');

//Creating web bot
function createWebBot(server) {
    var controller = webController(server);
    webMiddlewares(controller);
    webSkills(controller);
}

//Creating Facebook bot
function createFbBot(app) {
    var controller = fbController(app);
    fbMiddlewares(controller);
    fbSkills(controller);
    fbMenu(controller);
}

module.exports = function (server, app) {
    createWebBot(server);
    createFbBot(app);
}