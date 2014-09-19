casper.prototype.finish = function(suite) {
    casper.run(function() {
        suite.done();
    });
};


