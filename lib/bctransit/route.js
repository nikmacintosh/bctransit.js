var cheerio = require("cheerio")
  , Route = module.exports = function(name, url) {
      this.name = name;
      this.number = parseInt(url.match(/line=(\d+)/)[1], 10);
      this.url = url;
    }
  , request = require("request")
  , resolve = require("url").resolve;

require("./util/cheerio-map-compat");

Route.index = function(region, fn) {
  request({
    url: region.url
  }, function(err, res, body) {
    if (!body) return fn(err);

    var $ = cheerio.load(body)
      , selector = '#dvSchedule .rightmenusubitem a[href*="line="]'
      , urls = []
      , routes = $(selector).map(function() {
          var $this = $(this)
            , name = $this.text()
            , url = resolve(res.request.uri.href, $this.attr("href"))
            , route = new Route(name, url);

          if (~urls.indexOf(url)) return;

          urls.push(url);

          return route;
        }).sort(function(a, b) {
          return a.number - b.number;
        });

    fn(null, routes);
  });
};
