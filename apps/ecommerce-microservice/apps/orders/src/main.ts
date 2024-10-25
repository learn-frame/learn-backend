import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 10088,
      },
    },
  );
  await app.listen();
}
bootstrap();
