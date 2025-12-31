"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Groq = require("groq-sdk");

var groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
var SYSTEM_PROMPT = "\nYou are a helpful customer support agent for a small e-commerce store.\n\nStore policies:\n- Shipping: We ship worldwide. Delivery takes 5\u201310 business days.\n- Returns: 30-day return window for unused products.\n- Refunds: Refunds processed within 5 business days.\n- Support hours: Monday\u2013Friday, 9 AM\u20136 PM IST.\n\nGuidelines:\n- Be concise and friendly\n- Answer clearly\n- If unsure, say you will connect to human support\n";

function generateReply(history, userMessage) {
  var messages, completion;
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
          return regeneratorRuntime.awrap(groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: messages,
            max_tokens: 200,
            temperature: 0.3
          }));

        case 4:
          completion = _context.sent;
          return _context.abrupt("return", completion.choices[0].message.content);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("LLM error:", _context.t0.message);
          return _context.abrupt("return", "Sorry, our support agent is temporarily unavailable.");

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