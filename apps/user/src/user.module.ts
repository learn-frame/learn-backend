import { PrismaModule } from '@app/prisma'
import { RabbitMQModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [ConfigModule, RabbitMQModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService, Logger]
})
export class UserModule {}
