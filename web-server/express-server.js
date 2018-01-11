var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var http = require('http').Server(server);


module.exports = function(options) {

    if (!options.port) {
        throw new Error('Cannot start webserver without a port');
    }
    server.use(bodyParser.json());  //parse json
    server.use(bodyParser.urlencoded({ extended: true }));  //parse url encoded
    
    server.set('port', options.port);

    //Configure routes
    require('./routes')(server);
    
    http.listen(server.get('port'), function () {
        console.log('listening on port ' + server.get('port'));
    });

    return server;
};


