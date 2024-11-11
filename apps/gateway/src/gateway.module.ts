import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { EtcdModule, EtcdService } from '@app/etcd'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { getRandomInt } from 'yancey-js-util'
import { GatewayResolver } from './gateway.resolver'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [
          EtcdModule.register({
            serviceKey: 'product',
            host: 'localhost',
            port: 10091
          })
        ],
        name: 'PRODUCT_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            const availableServices =
              await etcdService.discoverServices('product')
            const selectedService =
              availableServices[getRandomInt(0, availableServices.length)]

            if (!selectedService) {
              throw new Error('')
            }

            return {
              transport: Transport.GRPC,
              options: {
                url: selectedService,
                package: 'product',
                protoPath: join(process.cwd(), 'proto/product.proto'),
                loader: {
                  includeDirs: [process.cwd(), 'proto']
                }
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
      },
      {
        imports: [
          EtcdModule.register({
            serviceKey: 'order',
            host: 'localhost',
            port: 10088
          })
        ],
        name: 'ORDER_PACKAGE',
        inject: [ConfigService, EtcdService],
        useFactory: async (
          configService: ConfigService,
          etcdService: EtcdService
        ) => {
          try {
            const availableServices =
              await etcdService.discoverServices('order')
            const selectedService =
              availableServices[getRandomInt(0, availableServices.length)]

            if (!selectedService) {
              throw new Error('')
            }

            return {
              transport: Transport.GRPC,
              options: {
                url: selectedService,
                package: 'order',
                protoPath: join(process.cwd(), 'proto/order.proto'),
                loader: {
                  includeDirs: [process.cwd(), 'proto']
                }
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      // http://localhost:10086/graphql
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  providers: [GatewayResolver, Logger]
})
export class GatewayModule {}
