import { Controller, Get, Logger } from '@nestjs/common'
import { CartService } from './cart.service'

@Controller()
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: Logger
  ) {}

  @Get()
  getHello(): string {
    return this.cartService.getHello()
  }
}
