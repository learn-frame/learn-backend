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
        package: 'cart',
        protoPath: join(process.cwd(), 'proto/cart.proto'),
        url: 'localhost:10089'
      }
    }
  )
  await app.listen()
}
bootstrap()
