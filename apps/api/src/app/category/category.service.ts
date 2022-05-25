import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    CategoryMessagePatterns,
    IClientService,
    IMutationResponse,
} from '@77-api/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class CategoryService implements IClientService {

    constructor(@Inject('CATEGORY_SERVICE') private client: ClientProxy) {
    }

    async follow(): Promise<IMutationResponse> {
        return lastValueFrom(this.client.send(CategoryMessagePatterns.GetCategories, {}));
    }

    healthCheck(): Observable<boolean> {
        return this.client.send(CategoryMessagePatterns.HealthCheck, {});
    }
}
