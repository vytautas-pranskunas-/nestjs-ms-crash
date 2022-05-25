import { IMutationResponse, RpcExceptionType } from '@77-api/core';
import { MutationSuccessResponse, MutationBadRequestResponse, MutationResponse } from '../models/mutation-response';

const exceptionToDisplay = [
    RpcExceptionType.ValidationError,
    RpcExceptionType.NotFound,
    RpcExceptionType.BadRequest,
]

export const mutationAction = async (
    action: () => Promise<IMutationResponse>,
    successMessage: string = 'Operation successful',
    failureMessage: string = 'Operation failed',
    onFail?: (...args: any) => Promise<void>,
): Promise<MutationResponse> => {
    let response: IMutationResponse;
    try {
        response = await action();
    } catch (ex) {
        console.log('ex', ex);
        const isValidationError = ex.type && exceptionToDisplay.indexOf(ex.type) !== -1;

        if (!isValidationError) {
            // errorLoggingService.logError(ex, 'Mutation Error', ErrorTag.GraphQLError); //TODO: logging
        }

        if (onFail) {
            try {
                await onFail();
            } catch (ex) {
                // errorLoggingService.logError(ex, 'Mutation on failure Error', ErrorTag.GraphQLError);
            }
        }

        return new MutationBadRequestResponse(isValidationError ? ex.message : failureMessage);
    }

    return new MutationSuccessResponse(successMessage, response.insertedIds, response.deletedIds, response.data);
};
