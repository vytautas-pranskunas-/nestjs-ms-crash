import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Category' })
export class Category {
    @Field(() => ID)
    _id: number;

    @Field()
    title: string;
}