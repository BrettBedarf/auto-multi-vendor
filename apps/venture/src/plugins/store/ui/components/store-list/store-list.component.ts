import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BaseListComponent, DataService } from '@vendure/admin-ui/core';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { GET_EXAMPLES } from './store-list.graphql';
import { GetStores, SortOrder } from '../../generated-types';

@Component({
	selector: 'pe-store-list',
	templateUrl: './store-list.component.html',
	styleUrls: ['./store-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreListComponent
	extends BaseListComponent<
		GetStores.Query,
		GetStores.Items,
		GetStores.Variables
	>
	implements OnInit
{
	filterTermControl = new FormControl('');

	constructor(
		private dataService: DataService,
		router: Router,
		route: ActivatedRoute
	) {
		super(router, route);
		super.setQueryFn(
			(...args: any[]) => {
				return this.dataService.query<GetStores.Query>(
					GET_EXAMPLES,
					args
				);
			},
			data => data.stores,
			(skip, take) => {
				return {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					options: {
						skip,
						take,
						sort: {
							createdAt: SortOrder.Desc,
						},
						...(this.filterTermControl.value
							? {
									filter: {
										name: {
											contains:
												this.filterTermControl.value,
										},
									},
							  }
							: {}),
					},
				};
			}
		);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.filterTermControl.valueChanges
			.pipe(debounceTime(250), takeUntil(this.destroy$))
			.subscribe(() => this.refresh());
	}
}
