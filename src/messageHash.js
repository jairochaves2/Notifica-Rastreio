import fs from "node:fs/promises";
import fsSync from "node:fs";
import Crypto from "node:crypto";
import { RedisClient } from "./redis.js";
import dotenv from "dotenv";
dotenv.config();

export class MessageHash {
  static redisClient = new RedisClient();

  static getHash(message) {
    return Crypto.createHash("sha1").update(message).digest("hex");
  }
  static async checkHash(message) {
    if (!this._checkIfExists()) {
      await this.saveHash(message);
      return { isEqual: false, hash: this.getHash(message) };
    }

    const beforeHash = await this._getSavedHash();
    const newHash = this.getHash(message);

    const isEqual = beforeHash === newHash;
    if (!isEqual) {
      await this.saveHash(message);
    }
    return { isEqual, hash: newHash };
  }

  static async saveHash(message) {
    const hash = this.getHash(message);
    await this._save(hash);
    return hash;
  }

  static async close() {
    this.redisClient.close();
  }

  static async _save(hash) {
    await this.redisClient.set("hash", hash);
  }

  static async _getSavedHash() {
    return await this.redisClient.get("hash");
  }

  static _checkIfExists() {
    return this.redisClient.exists("hash");
  }
}
