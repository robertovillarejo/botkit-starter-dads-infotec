var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var debug = require('debug')('STARTER:express-server');

module.exports = function(options) {

    if (!options.port) {
        throw new Error('Cannot start webserver without a port');
    }

    debug('Initializing web server...');
    var server = express();
    var http = require('http').Server(server);
    server.use(helmet());
    server.use(bodyParser.json());  //parse json
    server.use(bodyParser.urlencoded({ extended: true }));  //parse url encoded
    
    server.set('port', options.port);

    //Configure routes
    debug('Configuring routes...');
    require('./routes')(server);
    
    http.listen(server.get('port'), function () {
        debug('listening on port ' + server.get('port'));
    });

    return server;
};


