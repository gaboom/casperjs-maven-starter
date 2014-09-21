module.exports = {
  load: function() {
    casper.go("/");
  },
  search: function(term) {
    casper.then(function() {
      casper.fill('form[action="/search"]', {
        q: term
      }, true);
    });
  }
};


