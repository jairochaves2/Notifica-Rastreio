import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export class RedisClient {
  constructor() {
    this.client = new Redis(process.env.REDIS_URL);
  }

  async set(key, value) {
    await this.client.set(key, value);
    this.client.expireat(key, Date.now() + 43200);
  }

  async get(key) {
    return await this.client.get(key);
  }

  async del(key) {
    await this.client.del(key);
  }

  async exists(key) {
    return await this.client.exists(key);
  }

  async close() {
    await this.client.quit();
  }
}
