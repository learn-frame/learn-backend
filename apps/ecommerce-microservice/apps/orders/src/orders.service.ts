import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders = [{ id: 1, userId: 1, productId: 1, quantity: 2 }];

  findAll() {
    return this.orders;
  }
}
