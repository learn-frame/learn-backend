import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { EtcdModule } from '@app/etcd'
import { RabbitMqModule } from '@app/rabbit-mq'
import { PrismaModule } from '@app/prisma'
import { ConfigModule } from '@app/config'

@Module({
  imports: [ConfigModule, EtcdModule, RabbitMqModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
