import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductRequest,
  GetProductResponse,
  Product
} from 'types/proto/product'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private products: Product[] = [
    {
      id: 'a',
      name: 'John',
      description: '',
      unitPrice: 1,
      inventoryQuantity: 1,
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString()
    },
    {
      id: 'b',
      name: 'Doe',
      description: '',
      unitPrice: 2,
      inventoryQuantity: 2,
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString()
    }
  ]

  getProduct(
    request: GetProductRequest
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    console.log(this.products.find(({ id }) => id === request.id))
    return {
      product: this.products.find(({ id }) => id === request.id)
    }
  }

  async createProduct(
    request: CreateProductRequest
  ): Promise<CreateProductResponse> {
    const response = await this.prisma.product.create({
      data: request
    })

    return {
      product: {
        ...response,
        createdAt: response.createdAt.getTime().toString(),
        updatedAt: response.updatedAt.getTime().toString()
      }
    }
  }
}
