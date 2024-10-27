import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  Product,
  ProductServiceController,
  UpdateProductRequest,
  UpdateProductResponse
} from 'types/proto/product'
import { Observable } from 'rxjs'

@Controller()
export class ProductController implements ProductServiceController {
  createProduct(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse {
    throw new Error('Method not implemented.')
  }
  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(
    request: GetProductRequest
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    const products: Product[] = [
      {
        productId: '1',
        name: 'John',
        price: 1,
        inventoryQuantity: 1
      },
      {
        productId: '2',
        name: 'Doe',
        price: 2,
        inventoryQuantity: 2
      }
    ]

    return {
      product: products.find(({ productId }) => productId === request.productId)
    }
  }
  updateProduct(
    request: UpdateProductRequest
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse {
    throw new Error('Method not implemented.')
  }
  deleteProduct(
    request: DeleteProductRequest
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse {
    throw new Error('Method not implemented.')
  }
}
