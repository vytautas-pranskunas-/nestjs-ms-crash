import {
    ArgumentsHost,
    BadRequestException,
    Catch, ForbiddenException,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    RpcExceptionFilter
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRpcException, RpcExceptionType } from '.';

@Catch()
export class ApiControllerExceptionFilter implements RpcExceptionFilter<IRpcException> {

    private logger: Logger;

    constructor(private loggerName = '') {
        this.logger = new Logger(loggerName);
    }

    catch(exception: IRpcException, host: ArgumentsHost): Observable<any> {
        console.log('aaaaaaaa----------->', exception);
        this.logger.error(exception.message, exception.stack);
        if (exception.type === RpcExceptionType.NotFound) {
            throw new NotFoundException(exception.message);
        } else if(exception.type === RpcExceptionType.BadRequest) {
            throw new BadRequestException(exception.message);
        } else if(exception.type === RpcExceptionType.ValidationError) {
            throw new BadRequestException(exception.message);
        } else if(exception.type === RpcExceptionType.Forbidden) {
            throw new ForbiddenException(exception.message);
        } else if(exception.type === RpcExceptionType.InternalError) {
            throw new InternalServerErrorException(exception.message);
        } else {
            throw exception;
        }
    }
}
