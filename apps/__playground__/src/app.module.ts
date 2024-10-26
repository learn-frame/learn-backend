import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LearnRedisModule } from './module/learn-redis/learn-redis.module';

@Module({
  imports: [ConfigModule, LearnRedisModule],
})
export class AppModule {}
