import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
	BaseDetailComponent,
	DataService,
	NotificationService,
	ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import {
	Store,
	CreateStore,
	CreateStoreInput,
	UpdateStore,
	UpdateStoreInput,
} from '../../generated-types';
import { CREATE_EXAMPLE, UPDATE_EXAMPLE } from './store-detail.graphql';

@Component({
	selector: 'pe-store-detail',
	templateUrl: './store-detail.component.html',
	styleUrls: ['./store-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class StoreDetailComponent
	extends BaseDetailComponent<Store>
	implements OnInit
{
	detailForm: FormGroup;

	constructor(
		route: ActivatedRoute,
		router: Router,
		serverConfigService: ServerConfigService,
		private formBuilder: FormBuilder,
		protected dataService: DataService,
		private changeDetector: ChangeDetectorRef,
		private notificationService: NotificationService
	) {
		super(route, router, serverConfigService, dataService);
		this.detailForm = this.formBuilder.group({
			name: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.init();
	}

	create(): void {
		if (!this.detailForm) {
			return;
		}
		const formValue = this.detailForm.value;
		const store: CreateStoreInput = {
			name: formValue.name,
		};
		this.dataService
			.mutate<CreateStore.Mutation, CreateStore.Variables>(
				CREATE_EXAMPLE,
				{ input: store }
			)
			.subscribe(
				data => {
					this.notificationService.success(
						'common.notify-create-success',
						{
							entity: 'Store',
						}
					);
					this.detailForm.markAsPristine();
					this.changeDetector.markForCheck();
					this.router.navigate(['../', data.createStore.id], {
						relativeTo: this.route,
					});
				},
				() => {
					this.notificationService.error(
						'common.notify-create-error',
						{
							entity: 'Store',
						}
					);
				}
			);
	}

	save(): void {
		this.saveChanges()
			.pipe(filter(result => !!result))
			.subscribe(
				() => {
					this.detailForm.markAsPristine();
					this.changeDetector.markForCheck();
					this.notificationService.success(
						'common.notify-update-success',
						{
							entity: 'Store',
						}
					);
				},
				() => {
					this.notificationService.error(
						'common.notify-update-error',
						{
							entity: 'Store',
						}
					);
				}
			);
	}

	private saveChanges(): Observable<boolean> {
		if (this.detailForm.dirty) {
			const formValue = this.detailForm.value;
			const input: UpdateStoreInput = {
				id: this.id,
				name: formValue.name,
			};
			return this.dataService
				.mutate<UpdateStore.Mutation, UpdateStore.Variables>(
					UPDATE_EXAMPLE,
					{
						input,
					}
				)
				.pipe(mapTo(true));
		} else {
			return of(false);
		}
	}

	protected setFormValues(entity: Store): void {
		this.detailForm.patchValue({
			name: entity.name,
		});
	}
}
