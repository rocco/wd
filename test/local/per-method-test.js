var test;

test = require('../common/per-method-test-base').test;

describe("wd", function() {
  return describe("local", function() {
    return describe("per method tests", function() {
      describe("using chrome", function() {
        return test({}, {
          browserName: 'chrome'
        });
      });
      return describe("using firefox", function() {
        return test({}, {
          browserName: 'firefox'
        });
      });
    });
  });
});
