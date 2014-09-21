casperjs-maven-starter
======================

Testing setup for webapps using CasperJS and Maven,
quickstart example tutorial.

1. Directory structure
1. Page object pattern
1. Casper suite extensions:
    - viewport size support at start
    - convenience methods for run and done
    - screen capture on steroids: snap()
        * automatic viewport size support
        * prefix file name with suite file name
        * counting images, numbering file names per test suite
1. Casper lifecycle extensions:
    - snap screenshot on failure
    - log errors
    - log page exceptions, messages, alerts
    - log page open, navigation and failures
    - log resources requests and failures
1. Maven integration, parametrization, xUnit reports