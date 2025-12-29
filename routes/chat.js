const express = require("express");
const router = express.Router();

const rateLimit = require("../middlewares/rateLimit");
const { sendMessage } = require("../controllers/chat.controller");

router.post("/message", rateLimit, sendMessage);

module.exports = router;
