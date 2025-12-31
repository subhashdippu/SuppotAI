const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { generateReply } = require("./llm");
const { getContext, setContext } = require("./cache");

async function handleMessage(message, sessionId) {
  let conversation = sessionId ? await Conversation.findById(sessionId) : null;

  if (!conversation) {
    conversation = await Conversation.create({});
  }

  const conversationId = conversation._id.toString();

  await Message.create({
    conversationId,
    sender: "user",
    text: message,
  });

  let history = await getContext(conversationId);

  if (!history) {
    history = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .limit(10)
      .lean();
  }

  const reply = await generateReply(history, message);

  await Message.create({
    conversationId,
    sender: "ai",
    text: reply,
  });

  await setContext(conversationId, [
    ...history,
    { sender: "user", text: message },
    { sender: "ai", text: reply },
  ]);

  return { reply, sessionId: conversationId };
}

module.exports = { handleMessage };
