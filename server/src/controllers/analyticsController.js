import Url from "../models/url.js";
import client from "../utils/redisCache.js";


async function getAnalytics(req, res) {
  
    const code = req.params.code;
    


  //  Get total clicks from MySQL
 const url = await Url.findOne({
  where: {shortCode: code}
 });

  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }

const { clicks, created_at } = url;

  //  Get Redis stats
  const stats = await client.hGetAll(`stats:${code}`);
  const countryStats = await client.hGetAll(`country:${code}`);

  //  Get click history (last 100)
  const historyRaw = await client.lRange(`clicks:${code}`, 0, 99);

  const history = historyRaw.map(item => JSON.parse(item));

  //  Process data
  const clicksOverTime = {};

  history.forEach(entry => {
    const hour = new Date(entry.time).getHours();

    if (!clicksOverTime[hour]) {
      clicksOverTime[hour] = 0;
    }

    clicksOverTime[hour]++;
  });

  // convert to array
  const clicksTimeline = Object.keys(clicksOverTime).map(hour => ({
    hour,
    clicks: clicksOverTime[hour],
  }));

  const topCountries = Object.entries(countryStats).sort((a,b) => b[1] - a[1])
  .map(([country, count]) => ({
    country,
    clicks: Number(count),
  }));

  //  Get top IPs
  const ipCount = {};

  history.forEach(entry => {
    ipCount[entry.ip] = (ipCount[entry.ip] || 0) + 1;
  });

  const topIPs = Object.entries(ipCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ip]) => ip);

  //  Final response
  return res.json({
    totalClicks: clicks,
    createdAt: created_at,
    lastAccess: stats.lastAccess || null,
    topIPs,
    topCountries,
    clicksOverTime: clicksTimeline,
  });
}

export default getAnalytics;