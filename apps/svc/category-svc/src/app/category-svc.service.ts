import { Injectable } from '@nestjs/common';
import { RpcValidationException } from '@77-api/svc-core';

@Injectable()
export class CategorySvcService {
    async getCategories(): Promise<any[]> {
        throw new RpcValidationException('test ' + Math.random());
    }
}
