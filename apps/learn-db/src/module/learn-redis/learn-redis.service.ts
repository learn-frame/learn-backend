import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class LearnRedisService {
  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  public async setter() {
    await this.redisClient.set('string:1', 'value');
    await this.redisClient.set('string:2', 1);
    // await this.cacheManager.set('string:3', 1);
    // await this.cacheManager.set('string:4', {
    //   name: 'Yancey Leo',
    //   career: 'Software Engineer',
    // });
    // await this.cacheManager.set('string:5', [1, 2, 3, 4, 5]);
    return {
      success: true,
    };
  }

  public async getter() {
    const res = await this.redisClient.get('string:2');
    return { res };
  }
}
