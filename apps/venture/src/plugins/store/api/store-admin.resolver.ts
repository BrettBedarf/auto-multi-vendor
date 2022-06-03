import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
	Allow,
	Ctx,
	Permission,
	RequestContext,
	Transaction,
} from '@vendure/core';

import { StoreService } from '../service/store.service';
import { Store } from '../entities/store.entity';
import {
	MutationCreateStoreArgs,
	MutationUpdateStoreArgs,
} from '../generated-admin-types';

@Resolver()
export class StoreAdminResolver {
	constructor(private StoreService: StoreService) {}

	@Transaction()
	@Mutation()
	@Allow(Permission.SuperAdmin)
	createStore(
		@Ctx() ctx: RequestContext,
		@Args() args: MutationCreateStoreArgs
	): Promise<Store> {
		return this.StoreService.create(ctx, args.input);
	}

	@Transaction()
	@Mutation()
	@Allow(Permission.SuperAdmin)
	updateStore(
		@Ctx() ctx: RequestContext,
		@Args() args: MutationUpdateStoreArgs
	): Promise<Store | undefined> {
		return this.StoreService.update(ctx, args.input);
	}
}
