import { NestFactory } from '@nestjs/core'
import { GatewayModule } from './gateway.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GatewayModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath: join(process.cwd(), 'proto/product.proto'),
        url: '127.0.0.1:10087'
      }
    }
  )
  await app.listen()
}
bootstrap()
