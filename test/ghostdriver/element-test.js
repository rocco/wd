var desired, remoteWdConfig, test, _ref;

_ref = require('./config'); 
desired = _ref.desired; 
remoteWdConfig = _ref.remoteWdConfig;

test = require('../common/element-test-base').test;

describe("wd", function() {
  return describe("ghostdriver", function() {
    return describe("element tests", function() {
      return describe("using ghostdriver", function() {
        return test(remoteWdConfig, desired);
      });
    });
  });
});
