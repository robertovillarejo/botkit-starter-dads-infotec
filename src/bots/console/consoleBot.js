/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/
This is a sample Console bot built with Botkit.
This bot demonstrates many of the core features of Botkit:
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.
# RUN THE BOT:
  Run your bot from the command line:
    node console_bot.js
# USE THE BOT:
  Say: "Hello"
  The bot will reply "Hello!"
  Say: "who are you?"
  The bot will tell you its name, where it is running, and for how long.
  Say: "Call me <nickname>"
  Tell the bot your nickname. Now you are friends.
  Say: "who am I?"
  The bot will tell you your nickname, if it knows one for you.
  Say: "shutdown"
  The bot will ask if you are sure, and then shut itself down.
  Make sure to invite your bot into other channels using /invite @<my bot>!
# EXTEND THE BOT:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var path = require('path');
var env = require('node-env-file');
var envFile = path.join(__dirname, '../../.env');
env(envFile);
const dialogflowMiddleware = require("botkit-middleware-dialogflow")({
    token: process.env.DIALOGFLOW_CLIENT_TOKEN
});

var Botkit = require('botkit');
var os = require('os');

var controller = Botkit.consolebot({
    debug: false,
});

var bot = controller.spawn();

controller.middleware.receive.use(dialogflowMiddleware.receive);
controller.on('message_received', (bot, message) => {
    if (message['fulfillment']) {
        bot.reply(message, message.fulfillment.speech);
    }
});


controller.hears(['llamame (.*)', 'mi nombre es (.*)'], 'message_received', function (bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function (err, id) {
            bot.reply(message, 'Está bien. Te llamaré ' + user.name + ' desde ahora');
        });
    });
});

controller.hears(['cual es mi nombre', 'quien soy'], 'message_received', function (bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function (err, convo) {
                if (!err) {
                    convo.say('Aún no sé tu nombre');
                    convo.ask('Cómo debería llamarte?', function (response, convo) {
                        convo.ask('Deseas que te llame `' + response.text + '`?', [
                            {
                                pattern: 'si',
                                callback: function (response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function (response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function (response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, { 'key': 'nickname' }); // store the results in a field called nickname

                    convo.on('end', function (convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! Actualizaré mi dossier...');

                            controller.storage.users.get(message.user, function (err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function (err, id) {
                                    bot.reply(message, 'De acuerdo. Te llamaré ' + user.name + ' desde ahora.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, no importa!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['apagar'], 'message_received', function (bot, message) {

    bot.startConversation(message, function (err, convo) {

        convo.ask('Estás seguro de que quieres apagarme?', [
            {
                pattern: 'si',
                callback: function (response, convo) {
                    convo.say('Adiós!');
                    convo.next();
                    setTimeout(function () {
                        process.exit();
                    }, 3000);
                }
            },
            {
                pattern: ['no'],
                default: true,
                callback: function (response, convo) {
                    convo.say('*Fiu!*');
                    convo.next();
                }
            }
        ]);
    });
});


controller.hears(['identificate', 'quien eres', 'cual es tu nombre'],
    'message_received', function (bot, message) {

        bot.reply(message,
            'Soy ConsoleBot.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}