var actual = []
  , Region = require("../lib/bctransit/region")
  , should = require("chai").should();

before(function(done) {
  Region.index(function(err, regions) {
    if (!regions) return done(err);

    actual = regions;
    done();
  });
});

describe("Region", function() {
  describe("#index()", function() {
    it("should return a non-empty array of Regions.", function() {
      actual.should.not.be.empty;
      actual.should.be.an("array");
    });

    it("should return an array sorted by region name.");
  });

  describe("#abbreviation", function() {
    it("should exist.", function() {
      actual.forEach(function(region) { region.abbreviation.should.exist; });
    });

    it("should be a string.", function() {
      actual.forEach(function(region) {
        region.abbreviation.should.be.a("string");
      });
    });
  });

  describe("#constructor(name, url)", function() {
    var exampleUrl = "http://www.bctransit.com/regions/vic/?p=2.list";

    it(["should take a url (ex. ", exampleUrl, ")",
      " and parse 'vic' as its abbreviation."
    ].join(""), function() {
      var actual = new Region("Victoria", exampleUrl);

      actual.abbreviation.should.equal("vic");
    });
  });

  describe("#name", function() {
    it("should exist.", function() {
      actual.forEach(function(region) { region.name.should.exist; });
    });

    it("should be a string.", function() {
      actual.forEach(function(region) { region.name.should.be.a("string"); });
    });
  });

  describe("#url", function() {
    it("should exist.", function() {
      actual.forEach(function(region) { region.url.should.exist; });
    });

    it("should be a string.", function() {
      actual.forEach(function(region) { region.url.should.be.a("string"); });
    });
  });
});
