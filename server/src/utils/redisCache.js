// config/redis.ts
import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

client.on("error", (err) => console.error("Redis Error", err));

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

export default client;