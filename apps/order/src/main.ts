import LoggerModule from '@app/logger'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { OrderModule } from './order.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'order',
        // Due to the `order.proto` imports `cart.proto`, you must import `order.proto` in `protoPath`:
        // `protoPath: [join(process.cwd(), 'proto/order.proto'), join(process.cwd(), 'proto/order.proto')]`,
        // For simplicity, uses `loader.includeDirs` to import all files under the `proto` folder.
        protoPath: [join(process.cwd(), 'proto/order.proto')],
        loader: {
          includeDirs: [process.cwd(), 'proto']
        },
        url: 'localhost:10087'
      },
      logger: LoggerModule
    }
  )

  await app.listen()
}
bootstrap()
