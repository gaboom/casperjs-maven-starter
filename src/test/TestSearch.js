/*
 * http://casperjs.readthedocs.org/en/latest/index.html
 * 
 * http://docs.casperjs.org/en/latest/modules/casper.html
 * http://docs.casperjs.org/en/latest/modules/tester.html
 * http://docs.casperjs.org/en/latest/modules/utils.html
 * http://docs.casperjs.org/en/latest/modules/clientutils.html
 javascript:(function(){void(function(){if(!document.getElementById('CasperUtils')){var%20CasperUtils=document.createElement('script');CasperUtils.id='CasperUtils';CasperUtils.src='https://rawgit.com/n1k0/casperjs/master/modules/clientutils.js';document.documentElement.appendChild(CasperUtils);var%20interval=setInterval(function(){if(typeof%20ClientUtils==='function'){window.__utils__=new%20window.ClientUtils();clearInterval(interval);}},50);}}());})();
 */
var utils = require("utils");
var page = require("pages/SearchPage");

casper.test.begin('Google search retrieves 10 or more results', 4, function(test) {

  page.load();

  casper.then(function() {
    casper.snap("page loaded");
    test.assertTitle("Google", "google homepage title is the one expected");
    test.assertExists('form[action="/search"]', "main form is found");
  });

  page.search("casperjs");

  casper.then(function() {
    test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
    casper.snap("result loaded");
    test.assertEval(function() {
      return __utils__.findAll("h3.r").length >= 10;
    }, "google search for \"casperjs\" retrieves 10 or more results");
  });

  casper.do(test);
});

