import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Int)
  unitPrice: number

  @Field(() => Int)
  inventoryQuantity: number
}
