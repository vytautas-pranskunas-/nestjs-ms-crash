import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../../environments';
import { RedisClientService } from './redis-client.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ],
    exports: [RedisClientService],
    providers: [RedisClientService]
})
export class RedisClientModule {

}
