import { RabbitMQModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [RabbitMQModule],
  controllers: [UserController],
  providers: [UserService, Logger]
})
export class UserModule {}
