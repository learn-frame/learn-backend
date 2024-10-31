process.env.SERVICE_KEY = 'cart'

import { NestFactory } from '@nestjs/core'
import { CartModule } from './cart.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.GRPC,
      options: {
        package: process.env.SERVICE_KEY,
        protoPath: join(process.cwd(), 'proto/cart.proto'),
        url: `${process.env.HOST}:${process.env.PORT}`
      }
    }
  )
  await app.listen()
}
bootstrap()
