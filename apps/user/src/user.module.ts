import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { EtcdModule } from '@app/etcd'
import { RabbitMqModule } from '@app/rabbit-mq'

@Module({
  imports: [EtcdModule, RabbitMqModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
