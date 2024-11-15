import { RabbitMqModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [RabbitMqModule],
  controllers: [CartController],
  providers: [CartService, Logger]
})
export class CartModule {}
