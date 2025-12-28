"use strict";

var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("Conversation", conversationSchema);