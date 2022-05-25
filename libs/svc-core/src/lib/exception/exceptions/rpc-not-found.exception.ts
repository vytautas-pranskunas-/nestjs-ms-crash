import { RpcException } from '@nestjs/microservices';
import { RpcExceptionType } from '../rpc-exception-type.enum';
import { IRpcException } from '../rpc-exception.interface';

export class RpcNotFoundException extends RpcException implements IRpcException {

    type = RpcExceptionType.NotFound;
    message: string;

    constructor(error = 'Entity not found') {
        super({
            type: RpcExceptionType.NotFound,
            message: error,
        } as IRpcException);

        this.message = error;
    }

}
