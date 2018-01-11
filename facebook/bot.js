/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Facebook bot
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Botkit = require('botkit');
var dialogflowToFbMiddleware = require('../node_modules/dialogflow-to-facebook-middleware')({});

module.exports = function (options) {

    //Create controller
    var controller = Botkit.facebookbot({
        access_token: options.access_token,
        verify_token: options.verify_token,
        port: options.webserver.get('port')
    });

    //Import skills
    var normalizedPath = require("path").join(__dirname, "skills");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        require("./skills/" + file)(controller);
    });

    //Create bot
    var bot = controller.spawn({});

    //Assign web server to controller
    controller.webserver = options.webserver;

    //Create webhook endpoint
    controller.createWebhookEndpoints(controller.webserver, bot, function () {
        console.log('Facebook chatbot is online!!');
    });

    if (options.dialogflowMiddleware !== undefined) {
        //This middleware will send every message to dialogflow
        controller.middleware.receive.use(options.dialogflowMiddleware.receive);
    }

    //This will convert every response defined in dialogflow to Facebook format
    //If dialogflowMiddleware was not previously executed, simply will do nothing
    controller.middleware.receive.use(dialogflowToFbMiddleware.receive);
};