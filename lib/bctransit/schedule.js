var cheerio = require("cheerio")
  , request = require("request")
  , resolve = require("url").resolve
  , Schedule = module.exports = function(name, url) {
      var params = unescape(url).match(/route=\d+:(\d+)&day=(\d+)/);

      this.day = parseInt(params[2], 10);
      this.direction = parseInt(params[1], 10);
      this.name = name;
      this.url = url;
    };

require("./util/cheerio-map-compat");

Schedule.index = function(route, fn) {
  request({qs: { day: 99 }, url: route.url}, function(err, res, body) {
    if (!body) return fn(err);

    var $ = cheerio.load(body)
      , selector = "#pagecontent.thinborderleftright li a"
      , schedules = $(selector).map(function(i, a) {
          var $a = $(a)
            , name = $a.text()
            , url = resolve(route.url, $a.attr("href"));

          return new Schedule(name, url);
        });

    fn(null, schedules);
  });
};

Schedule.show = function(schedule, fn) {
  request({
    url: schedule.url
  }, function(err, res, body) {
    if (!body) return fn(err);

    var $ = cheerio.load(body);

    schedule.times = $(".css-sched-times").map(function(i, td) {
      var time = $(td).text();

      if (!time.match(/-|\d+:\d+/)) return;

      return time;
    });

    schedule.waypoints = [];

    $(".css-sched-waypoints[width]").each(function(i, td) {
      var waypoint = $(td).text();

      if (~schedule.waypoints.indexOf(waypoint)) return;

      schedule.waypoints.push(waypoint);
    });

    fn(null, schedule);
  });
};
