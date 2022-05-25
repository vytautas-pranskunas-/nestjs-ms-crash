import { RpcException } from '@nestjs/microservices';
import { RpcExceptionType } from '../rpc-exception-type.enum';
import { IRpcException } from '../rpc-exception.interface';

export class RpcForbiddenException extends RpcException {

    message: string;

    constructor(error = 'Forbidden') {
        super({
            type: RpcExceptionType.Forbidden,
            message: error
        } as IRpcException);
    }

}
