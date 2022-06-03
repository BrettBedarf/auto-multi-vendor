import { DeepPartial } from '@vendure/common/lib/shared-types';
import { Asset, Collection, VendureEntity } from '@vendure/core';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Store extends VendureEntity {
	constructor(input?: DeepPartial<Store>) {
		super(input);
	}

	@OneToOne(type => Collection)
	collection: Collection;

	@Column()
	logo: Asset;

	@Column()
	colorPrimary: string;

	@Column()
	colorSecondary: string;
}
