//TODO: Validate against json schema
module.exports = function (message) {
    if (message.nlpResponse) {
        return message.nlpResponse;
    } else {
        return {};
    }
}