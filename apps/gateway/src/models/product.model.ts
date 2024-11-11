import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Int)
  unitPrice: number

  @Field(() => Int)
  inventoryQuantity: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}

@ObjectType()
export class ProductResponse {
  @Field({ nullable: true })
  product?: Product
}
