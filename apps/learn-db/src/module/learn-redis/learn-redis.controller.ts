import { Controller, Get } from '@nestjs/common';
import { LearnRedisService } from './learn-redis.service';

@Controller('learn-redis')
export class LearnRedisController {
  constructor(private readonly learnRedisService: LearnRedisService) {}

  @Get('/string')
  string() {
    return this.learnRedisService.string();
  }

  @Get('/list')
  list() {
    return this.learnRedisService.list();
  }

  @Get('/json')
  json() {
    return this.learnRedisService.json();
  }

  @Get('/set')
  set() {
    return this.learnRedisService.set();
  }

  @Get('/hash')
  hash() {
    return this.learnRedisService.hash();
  }

  @Get('/helper')
  helper() {
    return this.learnRedisService.helper();
  }
}
