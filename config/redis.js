const { createClient } = require("redis");

let redisClient = null;

async function connectRedis() {
  const url = process.env.REDIS_URL;

  redisClient = createClient({ url });

  redisClient.on("error", (err) => console.error("Redis error", err));

  await redisClient.connect();
  console.log("Redis connected");

  return redisClient;
}

module.exports = { connectRedis };
