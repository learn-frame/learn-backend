import { ConfigModule } from '@app/config'
import { PrismaModule } from '@app/prisma'
import { RabbitMQModule } from '@app/rabbitmq'
import { Logger, Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [ConfigModule, RabbitMQModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, Logger]
})
export class ProductModule {}
