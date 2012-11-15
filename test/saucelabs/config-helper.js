var config, should;

should = require('should');

try {
  config = require('./config');
} catch (err) {

}

exports.getRemoteWdConfig = function() {
  var _ref, _ref1;
  should.exist(config, "Missing config!\nYou need to copy config-sample.coffee to config.coffee,\nand then configure your sauce username and access-key in\nconfig.coffee");
  return {
    host: "ondemand.saucelabs.com",
    port: 80,
    username: (_ref = config.saucelabs) !== null ? _ref.username : 0,
    accessKey: (_ref1 = config.saucelabs) !== null ? _ref1.accessKey : 0
  };
};
