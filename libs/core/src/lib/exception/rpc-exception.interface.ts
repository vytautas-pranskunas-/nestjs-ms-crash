import { RpcExceptionType } from './rpc-exception-type.enum';

export interface IRpcException {
    type: RpcExceptionType;
    message: string;
    stack?: any;
}
