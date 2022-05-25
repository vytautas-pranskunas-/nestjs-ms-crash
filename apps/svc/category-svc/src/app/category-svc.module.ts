import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorySvcController } from './category-svc.controller';
import { CategorySvcService } from './category-svc.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { configuration, RedisClientModule } from '@77-api/core';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        RedisClientModule,
        HealthCheckModule,
    ],
    controllers: [CategorySvcController],
    providers: [CategorySvcService],
})
export class CategorySvcModule { }
