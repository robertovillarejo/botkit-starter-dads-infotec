const TYPES = {
    MongoDBClient: Symbol.for('MongoDBClient'),
    UserService: Symbol.for('UserService'),
    WebController: Symbol.for('WebController'),
    FbController: Symbol.for('FacebookController'),
    webServer: Symbol.for('WebServer')
};

export default TYPES;
