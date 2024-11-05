import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { EtcdModule } from '@app/etcd'
import { RabbitMqModule } from '@app/rabbit-mq'
import { LoggerModule } from '@app/logger'

@Module({
  imports: [LoggerModule, EtcdModule, RabbitMqModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
