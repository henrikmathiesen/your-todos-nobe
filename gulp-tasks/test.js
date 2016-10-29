var Server = require('karma').Server;

module.exports = function (config) {
    return function (done) {
        new Server({
            configFile: config.src.karma
        }, function(){ done(); }).start();
    };
};