const express = require("express");
const { chatMessage } = require("../controllers/chat");

const router = express.Router();

router.post("/message", chatMessage);

module.exports = router;
