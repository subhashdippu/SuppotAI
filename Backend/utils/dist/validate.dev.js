"use strict";

function validateMessage(message) {
  if (!message || typeof message !== "string") {
    return "Message must be a non-empty string.";
  }

  var trimmed = message.trim();

  if (trimmed.length === 0) {
    return "Message cannot be empty.";
  }

  if (trimmed.length > 1000) {
    return "Message is too long (max 1000 characters).";
  }

  return null;
}

module.exports = {
  validateMessage: validateMessage
};