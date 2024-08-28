import { Controller, Get, Post } from '@nestjs/common';
import { LearnRedisService } from './learn-redis.service';

@Controller('learn-redis')
export class LearnRedisController {
  constructor(private readonly learnRedisService: LearnRedisService) {}

  @Post()
  setter() {
    return this.learnRedisService.setter();
  }

  @Get()
  getter() {
    return this.learnRedisService.getter();
  }
}
