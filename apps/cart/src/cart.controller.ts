import { Metadata } from '@grpc/grpc-js'
import { Controller, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import {
  CartServiceController,
  CreateCartRequest,
  CreateCartResponse,
  DeleteCartRequest,
  DeleteCartResponse,
  GetCartRequest,
  GetCartResponse,
  UpdateCartRequest,
  UpdateCartResponse
} from 'types/proto/cart'
import { CartService } from './cart.service'

@Controller()
export class CartController implements CartServiceController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: Logger
  ) {}
  getCart(
    request: GetCartRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ): Promise<GetCartResponse> | Observable<GetCartResponse> | GetCartResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  createCart(
    request: CreateCartRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<CreateCartResponse>
    | Observable<CreateCartResponse>
    | CreateCartResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  updateCart(
    request: UpdateCartRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<UpdateCartResponse>
    | Observable<UpdateCartResponse>
    | UpdateCartResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  deleteCart(
    request: DeleteCartRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<DeleteCartResponse>
    | Observable<DeleteCartResponse>
    | DeleteCartResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
}
