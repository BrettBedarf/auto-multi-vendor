import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';

import { PLUGIN_INIT_OPTIONS } from './constants';
import { Store } from './entities/store.entity';
import { StoreService } from './service/store.service';
import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { StoreResolver } from './api/store.resolver';
import { StoreAdminResolver } from './api/store-admin.resolver';
import { PluginInitOptions } from './types';

/**
 * An store Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     StorePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
// @VendurePlugin({
// 	// Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
// 	// access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
// 	imports: [PluginCommonModule],
// 	entities: [Store],
// 	adminApiExtensions: {
// 		schema: adminApiExtensions,
// 		resolvers: [StoreResolver, StoreAdminResolver],
// 	},
// 	shopApiExtensions: {
// 		schema: shopApiExtensions,
// 		resolvers: [StoreResolver],
// 	},
// 	providers: [
// 		StoreService,
// 		// By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
// 		// user-defined options into other classes, such as the {@link StoreService}.
// 		{
// 			provide: PLUGIN_INIT_OPTIONS,
// 			useFactory: () => StorePlugin.options,
// 		},
// 	],
// })
// export class StorePlugin {
// 	static options: PluginInitOptions;

// 	/**
// 	 * The static `init()` method is a convention used by Vendure plugins which allows options
// 	 * to be configured by the user.
// 	 */
// 	static init(options: PluginInitOptions): Type<StorePlugin> {
// 		this.options = options;
// 		return StorePlugin;
// 	}

// 	static uiExtensions: AdminUiExtension = {
// 		extensionPath: path.join(__dirname, 'ui'),
// 		ngModules: [
// 			{
// 				type: 'shared' as const,
// 				ngModuleFileName: 'store-ui-extension.module.ts',
// 				ngModuleName: 'StoreUiExtensionModule',
// 			},
// 			{
// 				type: 'lazy' as const,
// 				route: 'stores',
// 				ngModuleFileName: 'store-ui-lazy.module.ts',
// 				ngModuleName: 'StoreUiLazyModule',
// 			},
// 		],
// 	};
// }
