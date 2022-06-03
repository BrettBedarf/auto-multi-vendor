import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreDetailComponent } from './components/store-detail/store-detail.component';
import { StoreDetailResolver } from './providers/routing/store-detail-resolver';
import { GetStore } from './generated-types';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: StoreListComponent,
				data: {
					breadcrumb: [
						{
							label: 'Stores',
							link: ['/extensions', 'stores'],
						},
					],
				},
			},
			{
				path: ':id',
				component: StoreDetailComponent,
				resolve: { entity: StoreDetailResolver },
				data: { breadcrumb: storeDetailBreadcrumb },
			},
		]),
	],
	declarations: [StoreListComponent, StoreDetailComponent],
	providers: [StoreDetailResolver],
})
export class StoreUiLazyModule {}

export function storeDetailBreadcrumb(resolved: {
	entity: Observable<GetStore.Store>;
}): any {
	return resolved.entity.pipe(
		map(entity => [
			{
				label: 'Stores',
				link: ['/extensions', 'stores'],
			},
			{
				label: `${entity.id}`,
				link: [],
			},
		])
	);
}
