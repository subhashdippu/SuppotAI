"use strict";

var redis = require("../config/redis");

var WINDOW_SECONDS = 60;
var MAX_REQUESTS = 20;

function rateLimit(req, res, next) {
  var key, current;
  return regeneratorRuntime.async(function rateLimit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          key = "rate:".concat(req.ip);
          _context.next = 4;
          return regeneratorRuntime.awrap(redis.incr(key));

        case 4:
          current = _context.sent;

          if (!(current === 1)) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(redis.expire(key, WINDOW_SECONDS));

        case 8:
          if (!(current > MAX_REQUESTS)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(429).json({
            success: false,
            message: "Too many requests. Please slow down."
          }));

        case 10:
          next();
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Rate limit error:", _context.t0.message);
          next();

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

module.exports = rateLimit;