import Redis, { Redis as RedisClient } from 'ioredis'
import cache from '@config/cache';
import ICashProvider from "../models/ICashProvider";

export default class RedisCacheProvider implements ICashProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cache.config.redis)
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  };
  public async recover(key: string):Promise<string | null> {
    const data = await this.client.get(key)

    return data
  }
  public async invalidate(key: string): Promise<void> {};
}
