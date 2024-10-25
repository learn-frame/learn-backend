import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [{ id: 1, name: 'Product A', price: 100 }];

  findAll() {
    return this.products;
  }
}
