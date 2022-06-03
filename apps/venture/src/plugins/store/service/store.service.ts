import { Inject, Injectable } from '@nestjs/common';
import {
	ListQueryBuilder,
	PaginatedList,
	RequestContext,
	TransactionalConnection,
} from '@vendure/core';

import { Store } from '../entities/store.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';
import {
	CreateStoreInput,
	StoreListOptions,
	UpdateStoreInput,
} from '../generated-admin-types';

@Injectable()
export class StoreService {
	constructor(
		private connection: TransactionalConnection,
		@Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
		private listQueryBuilder: ListQueryBuilder
	) {}

	async findAll(
		ctx: RequestContext,
		options?: StoreListOptions
	): Promise<PaginatedList<Store>> {
		return this.listQueryBuilder
			.build(Store, options, { ctx })
			.getManyAndCount()
			.then(([items, totalItems]) => ({
				items,
				totalItems,
			}));
	}

	async findOne(ctx: RequestContext, id: string): Promise<Store | undefined> {
		return this.connection.getRepository(ctx, Store).findOne(id);
	}

	async create(ctx: RequestContext, input: CreateStoreInput): Promise<Store> {
		return this.connection.getRepository(ctx, Store).save(new Store(input));
	}

	async update(ctx: RequestContext, input: UpdateStoreInput): Promise<Store> {
		const store = await this.connection.getEntityOrThrow(
			ctx,
			Store,
			input.id
		);
		const updated = { ...store, ...input };
		return this.connection.getRepository(ctx, Store).save(updated);
	}
}
