var test;

test = require('../common/chain-test-base').test;

describe("wd", function() {
  return describe("local", function() {
    return describe("chain tests", function() {
      describe("using chrome", function() {
        return test('chrome');
      });
      return describe("using firefox", function() {
        return test('firefox');
      });
    });
  });
});
