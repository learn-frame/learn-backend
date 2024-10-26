import { Module } from '@nestjs/common'
import { LearnMysqlService } from './learn-mysql.service'
import { LearnMysqlController } from './learn-mysql.controller'

@Module({
  controllers: [LearnMysqlController],
  providers: [LearnMysqlService]
})
export class LearnMysqlModule {}
