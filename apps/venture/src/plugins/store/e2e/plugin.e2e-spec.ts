import {
	createTestEnvironment,
	registerInitializer,
	SqljsInitializer,
} from '@vendure/testing';
import path from 'path';

import { StorePlugin } from '../store-plugin';

import {
	CREATE_EXAMPLE,
	UPDATE_EXAMPLE,
} from './graphql/admin-e2e-definitions.graphql';
import {
	GET_EXAMPLES,
	GET_EXAMPLE,
} from './graphql/shop-e2e-definitions.graphql';
import { TEST_SETUP_TIMEOUT_MS, testConfig } from './config/test-config';
import { initialData } from './config/e2e-initial-data';
import { CreateStore, UpdateStore } from './types/generated-admin-types';
import { GetStores, GetStore } from './types/generated-shop-types';

registerInitializer(
	'sqljs',
	new SqljsInitializer(path.join(__dirname, '__data__'))
);

describe('store plugin', () => {
	const storeName = 'storeName';
	let storeId: string;

	const { server, adminClient, shopClient } = createTestEnvironment({
		...testConfig,
		plugins: [StorePlugin],
	});

	beforeAll(async () => {
		await server.init({
			initialData,
			productsCsvPath: path.join(__dirname, 'config/e2e-products.csv'),
			customerCount: 1,
			logging: true,
		});
		await adminClient.asSuperAdmin();
	}, TEST_SETUP_TIMEOUT_MS);

	afterAll(async () => {
		await server.destroy();
	});

	describe('admin api', () => {
		it('adds an store', async () => {
			const initialName = 'initialName';
			const {
				createStore: { id, name },
			} = await adminClient.query<
				CreateStore.Mutation,
				CreateStore.Variables
			>(CREATE_EXAMPLE, {
				input: {
					name: initialName,
				},
			});

			storeId = id;
			expect(name).toEqual(initialName);
		});

		it('updates an store', async () => {
			const {
				updateStore: { name },
			} = await adminClient.query<
				UpdateStore.Mutation,
				UpdateStore.Variables
			>(UPDATE_EXAMPLE, {
				input: {
					id: storeId,
					name: storeName,
				},
			});

			expect(name).toEqual(storeName);
		});

		it('returns a list of stores', async () => {
			const {
				stores: { items, totalItems },
			} = await adminClient.query<GetStores.Query, GetStores.Variables>(
				GET_EXAMPLES
			);

			expect(totalItems).toEqual(1);
			expect(items[0].name).toEqual(storeName);
		});

		it('returns a single store', async () => {
			const { store } = await adminClient.query<
				GetStore.Query,
				GetStore.Variables
			>(GET_EXAMPLE, {
				id: '1',
			});

			expect(store?.name).toEqual(storeName);
		});
	});

	describe('shop api', () => {
		it('returns a list of stores', async () => {
			const {
				stores: { items, totalItems },
			} = await shopClient.query<GetStores.Query, GetStores.Variables>(
				GET_EXAMPLES
			);

			expect(totalItems).toEqual(1);
			expect(items[0].name).toEqual(storeName);
		});

		it('returns a single store', async () => {
			const { store } = await shopClient.query<
				GetStore.Query,
				GetStore.Variables
			>(GET_EXAMPLE, {
				id: '1',
			});

			expect(store?.name).toEqual(storeName);
		});
	});
});
