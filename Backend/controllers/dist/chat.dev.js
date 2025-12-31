"use strict";

var _require = require("../utils/validate"),
    validateMessage = _require.validateMessage;

var chatService = require("../services/chat");

function sendMessage(req, res, next) {
  var _req$body, message, sessionId, error, result;

  return regeneratorRuntime.async(function sendMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, message = _req$body.message, sessionId = _req$body.sessionId;
          error = validateMessage(message);

          if (!error) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: error
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(chatService.handleMessage(message, sessionId));

        case 7:
          result = _context.sent;
          res.json({
            success: true,
            reply: result.reply,
            sessionId: result.sessionId
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

module.exports = {
  sendMessage: sendMessage
};