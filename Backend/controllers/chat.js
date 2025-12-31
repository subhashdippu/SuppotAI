const { validateMessage } = require("../utils/validate");
const chatService = require("../services/chat");

async function sendMessage(req, res, next) {
  try {
    const { message, sessionId } = req.body;

    const error = validateMessage(message);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const result = await chatService.handleMessage(message, sessionId);

    res.json({
      success: true,
      reply: result.reply,
      sessionId: result.sessionId,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendMessage };
