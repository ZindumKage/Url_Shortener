import sequelize from "../config/db.js";
import client from "../utils/redisCache.js";

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}h ${mins}m ${secs}s`;
}

async function status(req, res) {
  const start = Date.now();

  let dbStatus = "unknown";
  let redisStatus = "unknown";

  try {
    await sequelize.authenticate();
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }

  try {
    await client.ping();
    redisStatus = "connected";
  } catch {
    redisStatus = "disconnected";
  }

  const responseTime = Date.now() - start;

  res.json({
    status:
      dbStatus === "connected" && redisStatus === "connected"
        ? "OK"
        : "DEGRADED",

    services: {
      database: dbStatus,
      redis: redisStatus,
    },

    metrics: {
      uptime: formatUptime(process.uptime()),
      responseTime: `${responseTime}ms`,
      memory: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    },

    timestamp: new Date(),
  });
}

export default status;