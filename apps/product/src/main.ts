process.env.SERVICE_KEY = 'product'

import { NestFactory } from '@nestjs/core'
import { ProductModule } from './product.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC,
      options: {
        package: process.env.SERVICE_KEY,
        protoPath: join(process.cwd(), 'proto/product.proto'),
        url: `${process.env.HOST}:${process.env.PORT}`
      }
    }
  )
  await app.listen()
}
bootstrap()
