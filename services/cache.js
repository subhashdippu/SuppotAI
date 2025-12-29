const { getRedis } = require("../configs/redis");

const CONTEXT_LIMIT = 10;
const TTL = 1800;

async function getContext(conversationId) {
  const redis = getRedis();
  if (!redis) return null;

  const data = await redis.get(`chat:context:${conversationId}`);
  return data ? JSON.parse(data) : null;
}

async function setContext(conversationId, messages) {
  const redis = getRedis();
  if (!redis) return;

  await redis.set(
    `chat:context:${conversationId}`,
    JSON.stringify(messages.slice(-CONTEXT_LIMIT)),
    { EX: TTL }
  );
}

module.exports = { getContext, setContext };
