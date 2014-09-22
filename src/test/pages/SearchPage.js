module.exports = {
  load: function() {
    casper.go("/");
  },
  search: function(term) {
    casper.waitFor(function() {
      return casper.evaluate(function() {
        return document.querySelectorAll('form[action="/search"]').length > 0;
      });
    });
    casper.then(function() {
      casper.fill('form[action="/search"]', {
        q: term
      }, true);
    });
  }
};


