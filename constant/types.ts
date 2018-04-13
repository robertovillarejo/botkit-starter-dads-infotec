const TYPES = {
    MongoDBClient: Symbol.for('MongoDBClient'),
    UserService: Symbol.for('UserService'),
    WebController: Symbol.for('WebController'),
    FbController: Symbol.for('FacebookController'),
    webServer: Symbol.for('WebServer'),
    ChuckNorrisJokeService: Symbol.for('ChuckNorrisJokeService'),
    httpServer: Symbol.for("httpServer"),
    webBotConfigurer: Symbol.for("WebControllerConfigurer"),
    fbBotConfigurer: Symbol.for("FacebookControllerConfigurer")
};

export default TYPES;
