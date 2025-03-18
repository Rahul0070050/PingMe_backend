import { valkey } from "../../frameworks/database/redis/connection";

// Save messages in Redis (for quick access)
export const saveMessageToCache = async (userId: string, message: string) => {
  await valkey.set(`chat:${userId}`, message);
};

// Get recent messages (last 20)
export const getMessagesFromCache = async (userId: string, limit = 20) => {
  return await valkey.set(`chat:${userId}`, 0);
};
