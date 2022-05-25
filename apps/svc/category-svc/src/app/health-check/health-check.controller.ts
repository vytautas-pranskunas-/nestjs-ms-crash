import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiControllerExceptionFilter } from '@77-api/core';
import { HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check/health-check-result.interface';

@UseFilters(new ApiControllerExceptionFilter('HealthCheckController'))
@Controller('health-check')
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private ms: MicroserviceHealthIndicator,
    ) {}

    @Get()
    async check(): Promise<HealthCheckResult> {
        const result = await this.health.check([
            async () => Promise.resolve({}),
            async () =>
                this.ms.pingCheck('RABBIT_MQ', {
                    transport: Transport.RMQ,
                    timeout: 3000,
                    options: {
                        urls: [process.env.RMQ_URL],
                    },
                }),
        ]);
        return result;
    }
}
