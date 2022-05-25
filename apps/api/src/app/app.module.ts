import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { configuration } from '@77-api/core';
import { AuthModel } from './models';
import { CategoryModule } from './category';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: () => ({
                playground: false,
                autoSchemaFile: 'schema.gql',
                installSubscriptionHandlers: true,
                plugins: [ApolloServerPluginLandingPageLocalDefault()],
                context: () => ({
                    user: {
                        userId: '6283b3e9c4ca249822abcb8b', //TODO: add auth user
                        profileId: 'zygimantas.takulinskas',
                        role: 'admin', //TODO: add auth user
                    } as AuthModel,
                }),
            }),
        }),
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        CategoryModule,
    ],
})
export class AppModule { }
