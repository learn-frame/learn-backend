import { ConfigModule } from '@app/config'
import { PrismaModule } from '@app/prisma'
import { RabbitMqModule } from '@app/rabbitmq'
import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [ConfigModule, RabbitMqModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
