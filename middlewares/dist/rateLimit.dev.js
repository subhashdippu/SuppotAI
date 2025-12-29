"use strict";

var _require = require("../configs/redis"),
    getRedis = _require.getRedis;

var rateLimit = function rateLimit(req, res, next) {
  var redis, key, count;
  return regeneratorRuntime.async(function rateLimit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          redis = getRedis(); // ✅ actual client

          if (redis) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(500).json({
            message: "Redis not connected"
          }));

        case 3:
          key = "rate:".concat(req.ip);
          _context.next = 6;
          return regeneratorRuntime.awrap(redis.incr(key));

        case 6:
          count = _context.sent;

          if (!(count === 1)) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(redis.expire(key, 60));

        case 10:
          if (!(count > 100)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(429).json({
            message: "Too many requests"
          }));

        case 12:
          next();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = rateLimit;