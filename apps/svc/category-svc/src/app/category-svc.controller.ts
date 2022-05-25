import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
    CategoryMessagePatterns,
    RedisClientService,
} from '@77-api/core';
import { CategorySvcService } from './category-svc.service';
import { SvcControllerExceptionFilter } from '@77-api/svc-core';

@UseFilters(new SvcControllerExceptionFilter('CategorySvcController'))
@Controller()
export class CategorySvcController {
    constructor(private readonly categorySvcService: CategorySvcService, private redisClient: RedisClientService) {
        this.redisClient.connect();
    }

    @MessagePattern(CategoryMessagePatterns.GetCategories)
    async getCategories(): Promise<any[]> {
        try {
            const categories = this.categorySvcService.getCategories();
            console.log('LANDED HERE');
            await this.redisClient.invalidate('profiles:*');
            return categories;
        } catch (ex) {
            throw ex;
        }
    }
}
