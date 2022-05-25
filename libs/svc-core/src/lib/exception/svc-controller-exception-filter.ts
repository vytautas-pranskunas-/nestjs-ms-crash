import { ArgumentsHost, Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IRpcException } from './rpc-exception.interface';
import { RpcInternalErrorException } from './exceptions/rpc-internal-error.exception';

@Catch(RpcException)
export class SvcControllerExceptionFilter implements RpcExceptionFilter<IRpcException | { error: IRpcException }> {
    private logger: Logger;

    constructor(private loggerName = '') {
        this.logger = new Logger(loggerName);
    }

    catch(exception: IRpcException | { error: IRpcException; stack: any }, host: ArgumentsHost): Observable<any> {
        if (exception instanceof RpcException && !exception?.type && !(exception as any)?.error?.type) {
            return throwError(() =>
                new RpcInternalErrorException(
                    `Don't throw pure RpcException exception, switch to custom: RpcValidationException, RpcNotFoundException, etc.`
                )
            );
        }
        if ((exception as IRpcException)?.type) {
            this.logger.error(exception);
            return throwError(() => exception);
        }
        const rpcException = (exception as { error: IRpcException })?.error as IRpcException;
        if (rpcException?.type) {
            this.logger.error(exception);
            return throwError(() => (exception as { error: IRpcException }).error);
        }
        this.logger.error(exception, exception.stack);
        return throwError(() => new RpcInternalErrorException());
    }
}
