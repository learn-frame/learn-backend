import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ProductServiceController,
  UpdateProductRequest,
  UpdateProductResponse
} from 'types/proto/product'
import { ProductService } from './product.service'

@Controller()
export class ProductController implements ProductServiceController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  createProduct(
    request: CreateProductRequest
  ): Promise<CreateProductResponse> | CreateProductResponse {
    return this.productService.createProduct(request)
  }

  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(
    request: GetProductRequest
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    return this.productService.getProduct(request)
  }

  updateProduct(
    request: UpdateProductRequest
  ):
    | Promise<UpdateProductResponse>
    | Observable<UpdateProductResponse>
    | UpdateProductResponse {
    console.log(request)
    throw new Error('Method not implemented.')
  }

  deleteProduct(
    request: DeleteProductRequest
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse {
    console.log(request)
    throw new Error('Method not implemented.')
  }
}
