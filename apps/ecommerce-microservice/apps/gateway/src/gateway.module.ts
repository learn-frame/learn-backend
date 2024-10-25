import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 10086,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 10087,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 10088,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
