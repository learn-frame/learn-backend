import { Module } from '@nestjs/common';
import { MiddilewareService } from './middileware.service';

@Module({
  providers: [MiddilewareService],
  exports: [MiddilewareService],
})
export class MiddilewareModule {}
