const redis = require("../config/redis");

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;

async function rateLimit(req, res, next) {
  try {
    const key = `rate:${req.ip}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    if (current > MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please slow down.",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limit error:", err.message);
    next();
  }
}

module.exports = rateLimit;
