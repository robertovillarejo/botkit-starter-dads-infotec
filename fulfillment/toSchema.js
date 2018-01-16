module.exports = function (message) {
    if (message.nlpResponse) {
        return {
            sessionId: message.nlpResponse.sessionId,
            action: message.nlpResponse.result.action,
            parameters: message.nlpResponse.result.parameters
        };
    } else {
        return {};
    }
}