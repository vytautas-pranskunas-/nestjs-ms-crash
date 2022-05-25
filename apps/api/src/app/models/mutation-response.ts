import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class MutationResponse {
    @Field()
    code: number;

    @Field()
    isSuccess: boolean;

    @Field()
    message: string;

    @Field(() => [String], { nullable: true })
    insertedIds?: string[];

    @Field(() => [String], { nullable: true })
    deletedIds?: string[];

    @Field(() => GraphQLJSON, { nullable: true })
    data?: any;
}

export class MutationBadRequestResponse implements MutationResponse {
    code = 400;
    isSuccess = false;
    message: string;
    data?: any;

    constructor(message: string, data?: any) {
        this.message = message;
        this.data = data;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class MutationSuccessResponse implements MutationResponse {
    code = 200;
    isSuccess = true;
    message: string;
    insertedIds?: string[];
    deletedIds?: string[];
    data?: any;

    constructor(message = '', insertedIds?: string[], deletedIds?: string[], data?: any) {
        this.message = message;
        this.insertedIds = insertedIds;
        this.deletedIds = deletedIds;
        this.data = data;
    }
}
