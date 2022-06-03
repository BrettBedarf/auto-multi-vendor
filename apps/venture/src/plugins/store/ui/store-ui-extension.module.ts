import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
	imports: [SharedModule],
	providers: [
		addNavMenuSection(
			{
				id: 'stores',
				label: 'Stores',
				items: [
					{
						id: 'stores',
						label: 'Stores',
						routerLink: ['/extensions/stores'],
						icon: 'star',
					},
				],
			},
			'settings'
		),
	],
	exports: [],
})
export class StoreUiExtensionModule {}
