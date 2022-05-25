import { RpcException } from '@nestjs/microservices';
import { RpcExceptionType } from '../rpc-exception-type.enum';
import { IRpcException } from '../rpc-exception.interface';

export class RpcValidationException extends RpcException implements IRpcException {

    type = RpcExceptionType.ValidationError;
    message: string;

    constructor(error = 'Data provided is invalid') {
        super({
            type: RpcExceptionType.ValidationError,
            message: error,
        } as IRpcException);

        this.message = error;
    }

}
