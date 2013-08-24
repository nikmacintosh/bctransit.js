var _ = require("underscore")
  , actual = {}
  , actuals = []
  , Region = require("../lib/bctransit/region")
  , Route = require("../lib/bctransit/route")
  , Schedule = require("../lib/bctransit/schedule")
  , should = require("chai").should();

describe("Schedule", function() {
  before(function(done) {
    var fourteen = new Route(
          "Route 14 - VIC GENERAL / UVIC VIA RICHMOND",
          "http://www.bctransit.com/regions/vic/schedules/schedule.cfm?line=14"
        );

    Schedule.index(fourteen, function(err, schedules) {
      if (!schedules) return done(err);

      actuals = schedules;

      Schedule.show(actuals[0], function(err, schedule) {
        if (!schedule) return done(err);

        actual = schedule;
        done();
      });
    });
  });

  describe("#constructor(name, url)", function() {
    var exampleUrl = "http://www.bctransit.com/regions/vic"
      + "/schedules/schedule.cfm?route=14:1&day=6";

    it(["should take a url (ex. ", exampleUrl, ")",
      " and parse 6 as its day."
    ].join(""), function() {
      var actual = new Schedule(
            "14 VIC GENERAL / UVIC VIA RICHMOND",
            exampleUrl
          );

      actual.day.should.equal(6);
    });

    it(["should take a url (ex. ", exampleUrl, ")",
      " and parse 1 as its direction."
    ].join(""), function() {
      var actual = new Schedule(
            "14 VIC GENERAL / UVIC VIA RICHMOND",
            exampleUrl
          );

      actual.direction.should.equal(1);
    });
  });

  describe("#day", function() {
    it("should exist.", function() {
      actuals.forEach(function(schedule) { schedule.day.should.exist; });
    });

    it("should be a number.", function() {
      actuals.forEach(function(schedule) {
        schedule.day.should.be.a("number");
      });
    });
  });

  describe("#direction", function() {
    it("should exist.", function() {
      actuals.forEach(function(schedule) { schedule.direction.should.exist; });
    });

    it("should be a number.", function() {
      actuals.forEach(function(schedule) {
        schedule.direction.should.be.a("number");
      });
    });
  });

  describe("#index()", function() {
    it("should return an array.", function() {
      actuals.should.be.an("array");
    });

    it("should not be empty.", function() {
      actuals.should.not.be.empty;
    });
  });

  describe("#show()", function() {
    it("should return a schedule.", function() {
      actual.should.exist;
    });
  });

  describe("#name", function() {
    it("should exist.", function() {
      actuals.forEach(function(schedule) { schedule.name.should.exist;});
    });

    it("should be a string.", function() {
      actuals.forEach(function(schedule) {
        schedule.name.should.be.a("string");
      });
    });
  });

  describe("#times", function() {
    it("should exist.", function() {
      actual.times.should.exist;
    });

    it("should be an array.", function() {
      actual.times.should.be.an("array");
    });

    it("should not be empty.", function() {
      actual.times.should.not.be.empty;
    });

    it("should have elements resembling /-|\\d+:\\d+/.", function() {
      actual.times.forEach(function(time) { time.should.match(/-|\d+:\d+/); });
    });
  });

  describe("#url", function() {
    it("should exist.", function() {
      actuals.forEach(function(schedule) { schedule.url.should.exist;});
    });

    it("should be a string.", function() {
      actuals.forEach(function(schedule) {
        schedule.url.should.be.a("string");
      });
    });
  });

  describe("#waypoints", function() {
    it("should exist.", function() {
      actual.waypoints.should.exist;
    });

    it("should be an array.", function() {
      actual.waypoints.should.be.an("array");
    });

    it("should not be empty.", function() {
      actual.waypoints.should.not.be.empty;
    });

    it("should have elements that are strings.", function() {
      actual.waypoints.forEach(function(waypoint) {
        waypoint.should.be.a("string");
      });
    });

    it("should have only unique elements.", function() {
      var expected = _.uniq(actual.waypoints);

      actual.waypoints.should.deep.equal(expected);
    });
  });
});
