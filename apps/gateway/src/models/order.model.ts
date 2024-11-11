import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Order {
  @Field()
  id: string

  @Field()
  userId: string

  @Field(() => [OrderItem])
  items: OrderItem[]

  @Field(() => Int)
  totalPrice: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}

@ObjectType()
export class OrderItem {
  @Field()
  id: string

  @Field()
  cartId: string

  @Field()
  productId: string

  @Field(() => Int)
  quantity: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}

@ObjectType()
export class OrderResponse {
  @Field({ nullable: true })
  order?: Order
}
