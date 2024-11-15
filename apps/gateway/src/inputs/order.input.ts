import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class OrderItem {
  @Field()
  id: string

  @Field()
  cartId: string

  @Field()
  productId: string

  @Field(() => Int)
  totalPrice: number

  @Field()
  createdAt: string

  @Field()
  updatedAt: string
}

@InputType()
export class CreateOrderInput {
  @Field()
  userId: string

  @Field(() => [OrderItem])
  items: OrderItem[]

  @Field(() => Int)
  totalPrice: number
}
