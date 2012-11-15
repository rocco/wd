var chromeDesired, configHelper, explorerDesired, firefoxDesired, nameBase, remoteWdConfig, test;

test = require('../common/basic-test-base').test;

configHelper = require('./config-helper');

remoteWdConfig = configHelper.getRemoteWdConfig();

nameBase = "saucelabs basic test - ";

chromeDesired = {
  name: nameBase + 'chrome',
  browserName: 'chrome'
};

firefoxDesired = {
  name: nameBase + 'firefox',
  browserName: 'firefox'
};

explorerDesired = {
  name: nameBase + 'explorer',
  browserName: 'iexplore',
  version: '9',
  platform: 'Windows 2008'
};

describe("wd", function() {
  return describe("saucelabs", function() {
    return describe("basic tests", function() {
      describe("using chrome", function() {
        return test(remoteWdConfig, chromeDesired);
      });
      describe("using firefox", function() {
        return test(remoteWdConfig, firefoxDesired);
      });
      return describe("using explorer", function() {
        return test(remoteWdConfig, explorerDesired);
      });
    });
  });
});
