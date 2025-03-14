import * as redis from "redis";
import { config } from "../../../config/config";

const client: redis.RedisClientType = redis.createClient({
  url: config.redis.uri,
});
export async function createRedisClient() {
  try {
    await client.connect();
    client.on("connect", () => {
      console.log("Connected to Redis!");
    });

    client.on("error", (err: any) => {
      console.log(`Error  ${err}`);
    });

    console.log("Connected to Redis!");
    return client;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}
export default client;
