var cheerio = require("cheerio")
  , Region = module.exports = function(name, url) {
      this.abbreviation = url.match(/regions\/(\w+)/)[1];
      this.name = name;
      this.url = url;
    }
  , request = require("request")
  , resolve = require("url").resolve;

Region.index = function(fn) {
  request({
    url: "http://www.bctransit.com"
  }, function(err, res, body) {
    if (!body) return fn(err);

    var $ = cheerio.load(body)
      , selector = '#jumplist option[value^="/regions/"][value*="p=2.list"]'
      , regions = $(selector).map(function() {
          var $this = $(this)
            , name = $this.text()
            , url = resolve(res.request.uri.href, $this.val());

          return new Region(name, url);
        }).sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });

    fn(null, regions);
  });
};
