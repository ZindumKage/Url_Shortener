import client from "../utils/redisCache.js";


async function rateLimiter(req, res, next) {
   

    const key = `rate:${req.ip}`;
    const count = await client.incr(key);

    if (count === 1) {
        await client.expire(key, 60);
    }

    if (count > 50) {
        return res.status(429).json({error: "Too many requests"});

    }
    next();
}

export default rateLimiter;