var _ = require("underscore")
  , cheerio = require("cheerio");

cheerio.prototype.map = function(fn) {
  return _.reduce(this, function(memo, el, i) {
    var val = fn.call(this.make(el), i, el);
    return val == null ? memo : memo.concat(val);
  }, [], this);
};
