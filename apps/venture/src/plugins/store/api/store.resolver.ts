import { Args, Query, Resolver } from '@nestjs/graphql';
import { Ctx, PaginatedList, RequestContext } from '@vendure/core';

import { StoreService } from '../service/store.service';
import { Store } from '../entities/store.entity';
import { QueryStoresArgs } from '../generated-admin-types';

@Resolver()
export class StoreResolver {
	constructor(private StoreService: StoreService) {}

	@Query()
	stores(
		@Ctx() ctx: RequestContext,
		@Args() args: QueryStoresArgs
	): Promise<PaginatedList<Store>> {
		return this.StoreService.findAll(ctx, args.options || undefined);
	}

	@Query()
	store(
		@Ctx() ctx: RequestContext,
		@Args() args: { id: string }
	): Promise<Store | undefined> {
		return this.StoreService.findOne(ctx, args.id);
	}
}
