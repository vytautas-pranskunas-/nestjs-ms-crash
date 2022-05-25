import { RpcException } from '@nestjs/microservices';
import { RpcExceptionType } from '../rpc-exception-type.enum';
import { IRpcException } from '../rpc-exception.interface';

export class RpcBadRequestException extends RpcException implements IRpcException {

    type = RpcExceptionType.BadRequest;
    message: string;

    constructor(error = 'Bad request provided') {
        super({
            type: RpcExceptionType.BadRequest,
            message: error
        } as IRpcException);

        this.message = error;
    }
}
