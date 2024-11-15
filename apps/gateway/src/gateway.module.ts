import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { GatewayResolver } from './gateway.resolver'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url:
            process.env.NODE_ENV === 'production'
              ? 'order-service:10087'
              : 'localhost:10087',
          package: 'order',
          protoPath: join(process.cwd(), 'proto/order.proto'),
          loader: {
            includeDirs: [process.cwd(), 'proto']
          }
        }
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url:
            process.env.NODE_ENV === 'production'
              ? 'order-service:10088'
              : 'localhost:10088',
          package: 'product',
          protoPath: join(process.cwd(), 'proto/product.proto'),
          loader: {
            includeDirs: [process.cwd(), 'proto']
          }
        }
      }
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  providers: [GatewayResolver, Logger]
})
export class GatewayModule {}
