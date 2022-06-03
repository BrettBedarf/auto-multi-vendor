import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';

import { GetStore } from '../../generated-types';

import { GET_EXAMPLE } from './store-detail-resolver.graphql';

@Injectable()
export class StoreDetailResolver extends BaseEntityResolver<GetStore.Store> {
	constructor(router: Router, dataService: DataService) {
		super(
			router,
			{
				id: '',
				createdAt: new Date(),
				name: '',
			},
			id =>
				dataService
					.query<GetStore.Query, GetStore.Variables>(GET_EXAMPLE, {
						id,
					})
					.mapStream(data => data.store)
		);
	}
}
