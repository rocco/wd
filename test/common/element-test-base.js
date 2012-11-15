var CoffeeScript, Express, async, executeCoffee, should, test, textShouldEqual, wd;

CoffeeScript = require('coffee-script');

should = require('should');

async = require('async');

Express = require('./express').Express;

wd = require('./wd-with-cov');

textShouldEqual = function(browser, element, expected, done) {
  return browser.text(element, function(err, res) {
    should.not.exist(err);
    res.should.equal(expected);
    return done(null);
  });
};

executeCoffee = function(browser, script) {
  var scriptAsJs;
  scriptAsJs = CoffeeScript.compile(script, {
    bare: 'on'
  });
  return function(done) {
    return browser.execute(scriptAsJs, function(err) {
      should.not.exist(err);
      return done(null);
    });
  };
};

test = function(remoteWdConfig, desired) {
  var browser, express;
  browser = null;
  express = new Express();
  before(function(done) {
    express.start();
    return done(null);
  });
  after(function(done) {
    express.stop();
    return done(null);
  });
  describe("wd.remote", function() {
    return it("should create browser", function(done) {
      browser = wd.remote(remoteWdConfig);
      if (!process.env.WD_COV) {
        browser.on("status", function(info) {
          return console.log("\u001b[36m%s\u001b[0m", info);
        });
        browser.on("command", function(meth, path) {
          return console.log(" > \u001b[33m%s\u001b[0m: %s", meth, path);
        });
      }
      return done(null);
    });
  });
  describe("init", function() {
    return it("should initialize browserinit", function(done) {
      this.timeout(45000);
      return browser.init(desired, function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
  describe("get", function() {
    return it("should navigate to test page", function(done) {
      this.timeout(15000);
      return browser.get("http://127.0.0.1:8181/element-test-page.html", function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
  describe("element.text", function() {
    return it("should retrieve the text", function(done) {
      return browser.element("id", "text", function(err, el) {
        should.not.exist(err);
        el.should.have.property("text");
        return el.text(function(err, res) {
          res.should.include("I am some text");
          return done(null);
        });
      });
    });
  });
  describe("element.textPresent", function() {
    return it("should check if text is present", function(done) {
      return browser.element("id", "text", function(err, el) {
        should.not.exist(err);
        el.should.have.property("textPresent");
        return el.textPresent("some text", function(err, present) {
          should.not.exist(err);
          present.should.be.true;
          return done(null);
        });
      });
    });
  });
  describe("element.click", function() {
    return it("element should be clicked", function(done) {
      return browser.elementByCss("#click a", function(err, anchor) {
        should.not.exist(err);
        should.exist(anchor);
        return async.series([
          executeCoffee(browser, 'jQuery ->\n  a = $(\'#click a\')\n  a.click ->\n    a.html \'clicked\'\n    false              '), function(done) {
            return textShouldEqual(browser, anchor, "not clicked", done);
          }, function(done) {
            return anchor.click(function(err) {
              should.not.exist(err);
              return done(null);
            });
          }, function(done) {
            return textShouldEqual(browser, anchor, "clicked", done);
          }
        ], function(err) {
          should.not.exist(err);
          return done(null);
        });
      });
    });
  });
  describe("element.getTagName", function() {
    return it("should get correct tag name", function(done) {
      return async.series([
        function(done) {
          return browser.elementByCss("#getTagName input", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.getTagName(function(err, res) {
              should.not.exist(err);
              res.should.equal("input");
              return done(null);
            });
          });
        }, function(done) {
          return browser.elementByCss("#getTagName a", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.getTagName(function(err, res) {
              should.not.exist(err);
              res.should.equal("a");
              return done(null);
            });
          });
        }
      ], function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
  describe("element.isDisplayed", function() {
    return it("should check if elemnt is displayed", function(done) {
      return async.series([
        function(done) {
          return browser.elementByCss("#isDisplayed .displayed", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.isDisplayed(function(err, res) {
              should.not.exist(err);
              res.should.be.true;
              return done(null);
            });
          });
        }, function(done) {
          return browser.elementByCss("#isDisplayed .hidden", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.isDisplayed(function(err, res) {
              should.not.exist(err);
              res.should.be.false;
              return done(null);
            });
          });
        }, function(done) {
          return browser.elementByCss("#isDisplayed .displayed", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.displayed(function(err, res) {
              should.not.exist(err);
              res.should.be.true;
              return done(null);
            });
          });
        }
      ], function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
  describe("element.getComputedCss", function() {
    return it("should retrieve the element computed css", function(done) {
      return async.series([
        function(done) {
          return browser.elementByCss("#getComputedCss a", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.getComputedCss('color', function(err, res) {
              should.not.exist(err);
              should.exist(res);
              res.length.should.be.above(0);
              return done(null);
            });
          });
        }, function(done) {
          return browser.elementByCss("#getComputedCss a", function(err, field) {
            should.not.exist(err);
            should.exist(field);
            return field.getComputedCSS('color', function(err, res) {
              should.not.exist(err);
              should.exist(res);
              res.length.should.be.above(0);
              return done(null);
            });
          });
        }
      ], function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
  describe("element.getAttribute", function() {
    return it("should retrieve attribute value", function(done) {
      return browser.element("id", "getAttribute", function(err, el) {
        should.not.exist(err);
        el.should.have.property("getAttribute");
        return el.getAttribute("att", function(err, value) {
          should.not.exist(err);
          value.should.equal("42");
          return done(null);
        });
      });
    });
  });
  describe("element.getValue", function() {
    return it("should retrieve value", function(done) {
      return browser.element("id", "getValue", function(err, el) {
        should.not.exist(err);
        el.should.have.property("getValue");
        return el.getValue(function(err, value) {
          should.not.exist(err);
          value.should.equal("value");
          return done(null);
        });
      });
    });
  });
  describe("element.sendKeys", function() {
    return it("should send keys", function(done) {
      var text;
      text = "keys";
      return browser.element("id", "sendKeys", function(err, el) {
        should.not.exist(err);
        el.should.have.property("sendKeys");
        return el.sendKeys(text, function(err) {
          should.not.exist(err);
          return el.getValue(function(err, textReceived) {
            should.not.exist(err);
            textReceived.should.equal(text);
            return done(null);
          });
        });
      });
    });
  });
  describe("element.clear", function() {
    return it("should clear input field", function(done) {
      return browser.element("id", "clear", function(err, el) {
        should.not.exist(err);
        el.should.have.property("clear");
        return el.clear(function(err) {
          should.not.exist(err);
          return el.getValue(function(err, textReceived) {
            should.not.exist(err);
            textReceived.should.equal("");
            return done(null);
          });
        });
      });
    });
  });
  return describe("quit", function() {
    return it("should destroy browser", function(done) {
      return browser.quit(function(err) {
        should.not.exist(err);
        return done(null);
      });
    });
  });
};

exports.test = test;
