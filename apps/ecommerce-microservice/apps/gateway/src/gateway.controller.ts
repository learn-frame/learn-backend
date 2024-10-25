import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {
    this.usersClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 10086,
      },
    });

    this.productsClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 10087,
      },
    });

    this.ordersClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 10088,
      },
    });
  }

  @Get('users')
  getUsers() {
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }

  @Get('products')
  getProducts() {
    return this.productsClient.send({ cmd: 'get_products' }, {});
  }

  @Get('orders')
  getOrders() {
    return this.ordersClient.send({ cmd: 'get_orders' }, {});
  }
}
