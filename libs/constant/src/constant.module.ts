import { Module } from '@nestjs/common';
import { ConstantService } from './constant.service';

@Module({
  providers: [ConstantService],
  exports: [ConstantService],
})
export class ConstantModule {}
