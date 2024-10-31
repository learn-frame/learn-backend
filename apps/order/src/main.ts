process.env.SERVICE_KEY = 'order'

import { NestFactory } from '@nestjs/core'
import { OrderModule } from './order.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options: {
        package: process.env.SERVICE_KEY,
        // Due to the `order.proto` imports `cart.proto`, you must import `order.proto` in `protoPath`:
        // `protoPath: [join(process.cwd(), 'proto/order.proto'), join(process.cwd(), 'proto/order.proto')]`,
        // For simplicity, uses `loader.includeDirs` to import all files under the `proto` folder.
        protoPath: [join(process.cwd(), 'proto/order.proto')],
        loader: {
          includeDirs: [process.cwd(), 'proto']
        },
        url: `${process.env.HOST}:${process.env.PORT}`
      }
    }
  )
  await app.listen()
}
bootstrap()
