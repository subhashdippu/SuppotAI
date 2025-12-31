"use strict";

var express = require("express");

var router = express.Router();

var rateLimit = require("../middlewares/rateLimit");

var _require = require("../controllers/chat"),
    sendMessage = _require.sendMessage;

router.post("/message", rateLimit, sendMessage);
module.exports = router;