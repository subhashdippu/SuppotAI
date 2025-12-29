"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Conversation = require("../models/conversation");

var Message = require("../models/message");

var _require = require("./llm"),
    generateReply = _require.generateReply;

var _require2 = require("./cache"),
    getContext = _require2.getContext,
    setContext = _require2.setContext;

function handleChat(message, sessionId) {
  var conversation, conversationId, history, reply;
  return regeneratorRuntime.async(function handleChat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!sessionId) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Conversation.findById(sessionId));

        case 3:
          _context.t0 = _context.sent;
          _context.next = 7;
          break;

        case 6:
          _context.t0 = null;

        case 7:
          conversation = _context.t0;

          if (conversation) {
            _context.next = 12;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(Conversation.create({}));

        case 11:
          conversation = _context.sent;

        case 12:
          conversationId = conversation._id.toString();
          _context.next = 15;
          return regeneratorRuntime.awrap(Message.create({
            conversationId: conversationId,
            sender: "user",
            text: message
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(getContext(conversationId));

        case 17:
          history = _context.sent;

          if (history) {
            _context.next = 22;
            break;
          }

          _context.next = 21;
          return regeneratorRuntime.awrap(Message.find({
            conversationId: conversationId
          }).sort({
            createdAt: 1
          }).limit(10).lean());

        case 21:
          history = _context.sent;

        case 22:
          _context.next = 24;
          return regeneratorRuntime.awrap(generateReply(history, message));

        case 24:
          reply = _context.sent;
          _context.next = 27;
          return regeneratorRuntime.awrap(Message.create({
            conversationId: conversationId,
            sender: "ai",
            text: reply
          }));

        case 27:
          _context.next = 29;
          return regeneratorRuntime.awrap(setContext(conversationId, [].concat(_toConsumableArray(history), [{
            sender: "user",
            text: message
          }, {
            sender: "ai",
            text: reply
          }])));

        case 29:
          return _context.abrupt("return", {
            reply: reply,
            sessionId: conversationId
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  handleChat: handleChat
};