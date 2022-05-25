import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

const providers = [
    CategoryResolver,
    CategoryService,
]

@Module({
    imports: [
        HttpModule,
        CacheModule.register({ ttl: 300 }),
        ClientsModule.registerAsync([{
            name: 'CATEGORY_SERVICE',
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const rabbitMQUrl = configService.get<string>('rabbitMQUrl');
                console.log(configService.get<string>('rabbitMQUrl'));

                return {
                    transport: Transport.RMQ,
                    options: {
                        urls: [rabbitMQUrl],
                        queue: 'category_messages',
                        queueOptions: { durable: false }
                    }
                };
            },
            inject: [ConfigService],
        }]),
    ],
    providers: providers,
    exports: providers,
})
export class CategoryModule { }
