import { Module } from '@nestjs/common';
import { LearnRedisService } from './learn-redis.service';
import { LearnRedisController } from './learn-redis.controller';

@Module({
  controllers: [LearnRedisController],
  providers: [LearnRedisService],
})
export class LearnRedisModule {}
