import { PrismaModule } from '@app/prisma'
import { RabbitMQModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [ConfigModule, RabbitMQModule, PrismaModule],
  controllers: [CartController],
  providers: [CartService, Logger]
})
export class CartModule {}
