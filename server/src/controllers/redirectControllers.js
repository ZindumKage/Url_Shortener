import client from "../utils/redisCache.js";
import Url from "../models/url.js";
import geoip from "geoip-lite";
import { Sequelize } from "sequelize";

async function redirect(req, res) {
  const code = req.params.code;
  const ip = req.ip;

  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : "unknown";

  let originalUrl;
  let urlId;

  const cached = await client.hGetAll(`url:${code}`);

  if (cached && cached.original_url) {
    console.log(" Redis FULL HIT");

    originalUrl = cached.original_url;
    urlId = cached.id;
  } else {
    console.log(" MySQL HIT");

    const url = await Url.findOne({
      where: { shortCode: code },
    });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    originalUrl = url.originalUrl;
    urlId = url.id;

    await client.hSet(`url:${code}`, {
      original_url: originalUrl,
      id: urlId,
    });

    await client.expire(`url:${code}`, 3600);
  }

await Url.update(
  {
    lastIp: ip,
    clicks: Sequelize.literal("clicks + 1"),
  },
  {
    where: { id: urlId },
  }
);

  await client.hIncrBy(`stats:${code}`, "clicks", 1);
  await client.hIncrBy(`country:${code}`, country, 1);

  await client.lPush(
    `clicks:${code}`,
    JSON.stringify({
      ip,
      country,
      time: Date.now(),
    })
  );

  return res.redirect(originalUrl);
}

export default redirect;