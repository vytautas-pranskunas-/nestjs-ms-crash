import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    RmqOptions,
    Transport,
} from '@nestjs/microservices';

import { CategorySvcModule } from './app/category-svc.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(CategorySvcModule);

    const port = process.env.PORT || 6003;

    const configService = app.get<ConfigService>(ConfigService);
    const rabbitMQUrl = configService.get<string>('rabbitMQUrl');
    console.log(rabbitMQUrl);

    app.connectMicroservice(
        {
            transport: Transport.RMQ,
            options: {
                urls: [rabbitMQUrl],
                queue: 'category_messages',
                queueOptions: { durable: false }
            },
        } as RmqOptions
    );
    await app.startAllMicroservices();

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
