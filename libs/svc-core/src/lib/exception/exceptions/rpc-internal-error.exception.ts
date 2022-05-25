import { RpcException } from '@nestjs/microservices';
import { RpcExceptionType } from '../rpc-exception-type.enum';
import { IRpcException } from '../rpc-exception.interface';

export class RpcInternalErrorException extends RpcException implements IRpcException {

    type = RpcExceptionType.InternalError;
    message: string;

    constructor(error = 'Internal server error occurred') {
        super(error);
        this.message = error;
    }

}
