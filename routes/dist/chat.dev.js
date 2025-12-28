"use strict";

var express = require("express");

var _require = require("../controllers/chat"),
    chatMessage = _require.chatMessage;

var router = express.Router();
router.post("/message", chatMessage);
module.exports = router;