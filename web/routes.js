module.exports = function (webserver) {
    //Routes for webserver

    webserver.post('/botkit/history', function (req, res) {
        res.json({ success: true, history: [] });
    });
};