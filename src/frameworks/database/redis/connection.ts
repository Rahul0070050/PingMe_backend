import Valkey from "ioredis";
import dns from "dns";
import { promisify } from "util";
import { config } from "../../../config/config";

const lookup = promisify(dns.lookup);

export const valkey = new Valkey({
  username: config.ioredis.username || "",
  host: config.ioredis.host,
  password: config.ioredis.password || "",
  port: Number(config.ioredis.port) || 6379,
  tls: true ? {} : undefined,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});
export default async function createRedisClient() {
  try {
    if (!config.ioredis.host) {
      throw new Error(
        "Redis host is not defined in the environment variables."
      );
    }

    const { address } = await lookup(config.ioredis.host);
    // console.log("Resolved Redis IP:", address);

    valkey.on("connect", () => console.log("Connected to Valkey (Redis)"));
    valkey.on("error", (err) => console.error("Redis error:", err));
  } catch (error) {
    if (error instanceof Error) {
      console.error("DNS Lookup Failed:", error.message);
    }
    throw error;
  }
}
