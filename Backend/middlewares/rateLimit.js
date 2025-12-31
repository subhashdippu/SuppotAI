const { getRedis } = require("../configs/redis");

const rateLimit = async (req, res, next) => {
  const redis = getRedis(); // ✅ actual client

  if (!redis) {
    return res.status(500).json({ message: "Redis not connected" });
  }

  const key = `rate:${req.ip}`;

  const count = await redis.incr(key); // ✅ works

  if (count === 1) {
    await redis.expire(key, 60);
  }

  if (count > 100) {
    return res.status(429).json({ message: "Too many requests" });
  }

  next();
};

module.exports = rateLimit;
