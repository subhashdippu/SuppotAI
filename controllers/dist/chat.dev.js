"use strict";

var _require = require("../services/chat"),
    handleChat = _require.handleChat;

function chatMessage(req, res) {
  var _req$body, message, sessionId, result;

  return regeneratorRuntime.async(function chatMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, message = _req$body.message, sessionId = _req$body.sessionId;

          if (!(!message || !message.trim())) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Message cannot be empty"
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(handleChat(message.trim(), sessionId));

        case 5:
          result = _context.sent;
          res.json(result);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  chatMessage: chatMessage
};