"use strict";

var _require = require("../configs/redis"),
    getRedis = _require.getRedis;

var CONTEXT_LIMIT = 10;
var TTL = 1800;

function getContext(conversationId) {
  var redis, data;
  return regeneratorRuntime.async(function getContext$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          redis = getRedis();

          if (redis) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", null);

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(redis.get("chat:context:".concat(conversationId)));

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data ? JSON.parse(data) : null);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function setContext(conversationId, messages) {
  var redis;
  return regeneratorRuntime.async(function setContext$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          redis = getRedis();

          if (redis) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(redis.set("chat:context:".concat(conversationId), JSON.stringify(messages.slice(-CONTEXT_LIMIT)), {
            EX: TTL
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getContext: getContext,
  setContext: setContext
};