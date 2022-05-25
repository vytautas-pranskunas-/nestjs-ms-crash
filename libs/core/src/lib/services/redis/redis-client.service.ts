import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis4';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisClientService {

    client: RedisClientType<any>;
    subscriber: RedisClientType<any>;

    private logger = new Logger('RedisClientService');

    constructor(configService: ConfigService) {
        try {
            const redisUrl = configService.get<string>('redisUrl');
            this.client = createClient({ url: redisUrl });
            this.subscriber = this.client.duplicate();
        } catch (err) {
            this.logger.error(err, err.stack);
            throw err;
        }
    }

    async set<T>(key: string, value: T, ttl: number = null): Promise<void> {
        await this.client.set(key, JSON.stringify(value), { EX: ttl });
    }

    async del<T>(key: string): Promise<void> {
        await this.client.del(key);
    }

    async get<T>(key: string): Promise<T> {
        let valueStr = await this.client.get(key);
        if (valueStr?.trim) {
            valueStr = valueStr.trim();
        }
        if (valueStr !== '') {
            return JSON.parse(valueStr);
        }
        return null;
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            await this.subscriber.connect();
        } catch (err) {
            this.logger.error(err);
        }
    }

    async cacheClear(): Promise<string> {
        return this.client.flushAll();
    }

    async subscribe<T>(channel: string, callback: (data: T) => void): Promise<void> {
        return this.subscriber.subscribe(channel, (data) => {
            callback(JSON.parse(data) as T);
        });
    }

    async publish<T>(channel: string, data: T): Promise<number> {
        return this.client.publish(channel, JSON.stringify(data));
    }

    async getCached<T>(key: string, fetchFn: () => Promise<T>, ttl: number = null): Promise<T> {
        let cached = null;
        try {
            cached = await this.get<T>(key);
        } catch (err) {
            this.logger.error(`Error fetching redis cached key "${key}"`);
            this.logger.error(err.message, err.stack);
        }
        if (cached) {
            return cached;
        }
        const result = await fetchFn();
        try {
            await this.set(key, result, ttl);
        } catch (err) {
            this.logger.error(`Error setting "${key}" value`);
            this.logger.error(err.message, err.stack);
        }
        return result;
    }

    async invalidate(pattern: string): Promise<void> {
        try {
            const keys = await this.client.keys(pattern);
            for (const key of keys) {
                this.logger.debug(`Key "${key}" invalidated by pattern: "${pattern}"`);
                await this.del(key);
            }
        } catch (err) {
            this.logger.error(`Error while invalidating redis cache`, err.stack);
        }
    }
}
