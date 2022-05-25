import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { MutationResponse } from '../models';
import { mutationAction } from '../infrastructure/mutation.helper';
import { Category } from './category';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private categoryService: CategoryService) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }

    @Mutation(() => MutationResponse, { name: 'followCategory' })
    async follow() {
        return mutationAction(() => this.categoryService.follow(),
            'Now you are following this category',
            'Follow action failed',
        );
    }
}
