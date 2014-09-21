var system = require("system");
var utils = require("utils");

// Convenience start method with viewportSize support
casper.go = function(url) {
  casper
    .start()
    .viewport(casper.viewportSize.width, casper.viewportSize.height)
    .thenOpen(casper.cli.options.url + url);
};

// Convenience run method
casper.do = function(suite) {
  casper.run(function() {
    suite.done();
  });
};

// Convenienvce capture method with auto file name (counter per suite, suite file name prefix) and auto viewportSize clip
(function() {
  var TEST_FILE_ARGUMENT_INDEX = 6; // Must change when arguments change
  var counter = null;
  var lastTestFile = null;

  var pad = function(a,b){return(1e15+a+"").slice(-b);};

  casper.snap = function(name) {
    var testFile = system.args[TEST_FILE_ARGUMENT_INDEX].match(/^.*\/(Test.+)\.js$/)[1] ; 
    
    if (testFile === lastTestFile) {
      counter += 1;
    } else {
      counter = 0;
      lastTestFile = testFile;
    }

    var imgFile = "target/" + testFile + "-" + pad(counter,3) + (name ? "-" + name : "") + ".png";

    casper.capture(imgFile, {
      top: 0,
      left: 0,
      width: casper.viewportSize.width,
      height: casper.viewportSize.height
    });
  };
})();
