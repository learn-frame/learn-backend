import { EtcdModule } from '@app/etcd'
import { RabbitMqModule } from '@app/rabbit-mq'
import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [EtcdModule, RabbitMqModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
