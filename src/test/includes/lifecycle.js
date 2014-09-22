var system = require("system");
var utils = require("utils");

utils.dump(system.args);

casper.viewportSize = {
  width: casper.cli.options.viewportWidth,
  height: casper.cli.options.viewportHeight
};

(function() {
  var log = function(message, object, level) {
    casper.log(message + " " + JSON.stringify(object), level, "lifecycle");
  };
  ["error", "warning", "info", "debug"].forEach(function(level) {
    log[level] = function(message, object) {
      log(message, object, level);
    };
  });
  var isDebugEnabled = casper.logLevel === "debug";

  casper.on("remote.alert", function(message) {
    log.info("Alert", message);
  });
  casper.on("remote.message", function(message) {
    log.info("Message", message);
  });

  casper.test.on("fail", function() {
    casper.snap("FAIL");
  });

  casper.on("error", function(error, trace) {
    log.error("Exception in suite", [].slice.call(arguments));
  });
  casper.on("complete.error", function(error) {
    log.error("Exception in step", [].slice.call(arguments));
  });
  casper.on("page.error", function(error, trace) {
    log.error("Exception in page", [].slice.call(arguments));
  });

  casper.on("open", function(location, settings) {
    log.info("Page open", [].slice.call(arguments));
  });
  casper.on("navigation.requested", function(url, navigationType, navigationLocked, isMainFrame) {
    log.info("Page navigate", [].slice.call(arguments));
  });
  if (isDebugEnabled) {
    casper.on("page.resource.requested", function(request) {
      log.debug("Page request", [].slice.call(arguments));
    });
    casper.on("page.resource.received", function(response) {
      log.debug("Page response", [].slice.call(arguments));
    });
  }
  casper.on('http.status.404', function(resource) {
    log.warning("Page 404", [].slice.call(arguments));
  });
  casper.on('http.status.500', function(resource) {
    log.error("Page 500", [].slice.call(arguments));
  });

  if (isDebugEnabled) {
    casper.on("resource.requested", function(request) {
      log.debug("Resource request", [].slice.call(arguments));
    });
    casper.on("resource.response", function(request) {
      log.debug("Resource response", [].slice.call(arguments));
    });
  }
  casper.on("resource.error", function(error) {
    var logger = log.warn;
    var message = "error";
    switch (error.errorCode) { // https://github.com/ariya/phantomjs/tree/master/src/qt/qtbase/src/network/access/qnetworkreply.h
      case 5:
        logger = log.info;
        message = "canceled";
        break;
    }
    logger("Resource " + message, [].slice.call(arguments));
  });
})();
