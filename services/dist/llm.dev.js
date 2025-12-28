"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var OpenAI = require("openai");

var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
var SYSTEM_PROMPT = "\nYou are a e-commerce support agent.\n\nShipping: Worldwide (5\u201310 business days)\nReturns: 30-day return window\nSupport: Mon\u2013Fri, 9AM\u20136PM IST\n";

function generateReply(history, userMessage) {
  var messages, res;
  return regeneratorRuntime.async(function generateReply$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          messages = [{
            role: "system",
            content: SYSTEM_PROMPT
          }].concat(_toConsumableArray(history.map(function (m) {
            return {
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            };
          })), [{
            role: "user",
            content: userMessage
          }]);
          _context.next = 4;
          return regeneratorRuntime.awrap(openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 200
          }));

        case 4:
          res = _context.sent;
          return _context.abrupt("return", res.choices[0].message.content);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("LLM error:", _context.t0.message);
          return _context.abrupt("return", "Sorry, I'm having trouble responding right now.");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = {
  generateReply: generateReply
};