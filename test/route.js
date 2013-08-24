var _ = require("underscore")
  , actual = []
  , Region = require("../lib/bctransit/region")
  , Route = require("../lib/bctransit/route")
  , should = require("chai").should();

  before(function(done) {
    Region.index(function(err, regions) {
      if (!regions) return done(err);

      region = regions[Math.floor(Math.random() * regions.length)];

      Route.index(region, function(err, routes) {
        if (!routes) return done(err);

        actual = routes;
        done();
      });
    });
  });

  describe("Route", function() {
    describe("#index()", function() {
      it("should return a non-empty array.", function() {
        actual.should.not.be.empty;
        actual.should.be.an("array");
      });

      it("should return an array containing only unique routes.", function() {
        var expected = _.uniq(actual, function(route) {
          return route.number;
        });

        actual.should.deep.equal(expected);
      });

      it("should return an array sorted by number.");
    });

    describe("#constructor(name, url)", function() {
      var exampleUrl = "http://www.bctransit.com/regions/vic"
        + "/schedules/schedule.cfm?line=14";

      it(["should take a url (ex. ", exampleUrl, ")",
        " and parse 14 as its number."
      ].join(""), function() {
        var actual = new Route(
              "14 VIC GENERAL / UVIC VIA RICHMOND",
              exampleUrl
            );

        actual.number.should.equal(14);
      });
    });

    describe("#name", function() {
      it("should exist.", function() {
        actual.forEach(function(route) { route.name.should.exist;});
      });

      it("should be a string.", function() {
        actual.forEach(function(route) { route.name.should.be.a("string"); });
      });
    });

    describe("#number", function() {
      it("should exist.", function() {
        actual.forEach(function(route) { route.number.should.exist;});
      });

      it("should be a number.", function() {
        actual.forEach(function(route) { route.number.should.be.a("number"); });
      });
    });

    describe("#url", function() {
      it("should exist.", function() {
        actual.forEach(function(route) { route.url.should.exist;});
      });

      it("should be a string.", function() {
        actual.forEach(function(route) { route.url.should.be.a("string"); });
      });
    });
  });
