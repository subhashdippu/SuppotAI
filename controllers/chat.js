const { handleChat } = require("../services/chat");

async function chatMessage(req, res) {
  const { message, sessionId } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  const result = await handleChat(message.trim(), sessionId);
  res.json(result);
}

module.exports = { chatMessage };
