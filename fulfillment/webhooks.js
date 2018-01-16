var debug = require('debug')('starter:webhooks');
//Initialize WebHooks module
var WebHooks = require('node-webhooks');

//Create webhooks for fulfillment
var webHooks = new WebHooks({
    db: './webHooksDB.json'
});

var fulfillmentWebhooks = [{
    name: 'fulfillment',
    url: 'http://localhost:8090/fulfillment'
}];

fulfillmentWebhooks.forEach(wh => {
    webHooks.add(wh.name, wh.url).then(function(){
        debug('Added webhook ' + wh.name + '\t with url: ' + wh.url);
    }).catch(function(err){
        debug('Failed to add webhook ' + wh.name + ' with url ' + wh.url);
    });
});

module.exports = webHooks;

