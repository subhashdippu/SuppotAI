"use strict";

var _require = require("redis"),
    createClient = _require.createClient;

var redisClient = null;

function connectRedis() {
  var url;
  return regeneratorRuntime.async(function connectRedis$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = process.env.REDIS_URL;
          redisClient = createClient({
            url: url
          });
          redisClient.on("error", function (err) {
            return console.error("Redis error", err);
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(redisClient.connect());

        case 5:
          console.log("Redis connected");
          return _context.abrupt("return", redisClient);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  connectRedis: connectRedis
};