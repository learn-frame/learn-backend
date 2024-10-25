import { Controller, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_orders' })
  async findAll() {
    const products = await this.productsClient
      .send({ cmd: 'get_products' }, {})
      .toPromise();

    const orders = this.ordersService.findAll();

    return {
      products,
      orders,
    };
  }
}
