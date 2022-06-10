import { MultiStore } from './plugins/multi-store/store';
import {
	dummyPaymentHandler,
	DefaultJobQueuePlugin,
	DefaultSearchPlugin,
	VendureConfig,
	Asset,
	LanguageCode,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';
import { ExamplePlugin } from './plugins/example/plugin';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import { RestPlugin } from './plugins/rest/rest.plugin';

export const config: VendureConfig = {
	apiOptions: {
		port: 3000,
		adminApiPath: 'admin-api',
		adminApiPlayground: {
			settings: {
				'request.credentials': 'include',
			} as any,
		}, // turn this off for production
		adminApiDebug: true, // turn this off for production
		shopApiPath: 'shop-api',
		shopApiPlayground: {
			settings: {
				'request.credentials': 'include',
			} as any,
		}, // turn this off for production
		shopApiDebug: true, // turn this off for production
	},
	authOptions: {
		superadminCredentials: {
			identifier: 'superadmin',
			password: 'superadmin',
		},
		cookieOptions: {
			secret: process.env.COOKIE_SECRET || 'cookie-secret',
		},
	},
	dbConnectionOptions: {
		type: 'better-sqlite3',
		synchronize: true, // turn this off for production
		logging: false,
		database: path.join(__dirname, '../vendure.sqlite'),
		migrations: [path.join(__dirname, '../migrations/*.ts')],
	},
	paymentOptions: {
		paymentMethodHandlers: [dummyPaymentHandler],
	},
	customFields: {
		Channel: [
			{
				name: 'displayName',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Store Display Name',
					},
				],
				type: 'string',
			},
			{
				name: 'logo',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Logo',
					},
				],
				type: 'relation',
				entity: Asset,
				eager: true,
			},
			{
				name: 'subdomain',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Subdomain',
					},
				],
				type: 'string',
			},
			{
				name: 'deployedUrl',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Deployed Url',
					},
				],
				type: 'string',
			},
			{
				name: 'primaryColor',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Primary Color',
					},
				],
				type: 'string',
				pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
				description: [
					{
						languageCode: LanguageCode.en,
						value: 'Hex value of the primary color i.e. #ff0000. Google "hex color picker" to find a hex value.',
					},
				],
				length: 7,
			},
			{
				name: 'secondaryColor',
				label: [
					{
						languageCode: LanguageCode.en,
						value: 'Secondary Color',
					},
				],
				type: 'string',
				pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
				description: [
					{
						languageCode: LanguageCode.en,
						value: 'Hex value of the secondary color i.e. #ff0000. Google "hex color picker" to find a hex value.',
					},
				],
			},
		],
	},
	plugins: [
		AssetServerPlugin.init({
			route: 'assets',
			assetUploadDir: path.join(__dirname, '../static/assets'),
		}),
		DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
		DefaultSearchPlugin.init({
			bufferUpdates: false,
			indexStockStatus: true,
		}),
		EmailPlugin.init({
			devMode: true,
			outputPath: path.join(__dirname, '../static/email/test-emails'),
			route: 'mailbox',
			handlers: defaultEmailHandlers,
			templatePath: path.join(__dirname, '../static/email/templates'),
			globalTemplateVars: {
				// The following variables will change depending on your storefront implementation
				fromAddress: '"example" <noreply@example.com>',
				verifyEmailAddressUrl: 'http://localhost:8080/verify',
				passwordResetUrl: 'http://localhost:8080/password-reset',
				changeEmailAddressUrl:
					'http://localhost:8080/verify-email-address-change',
			},
		}),
		AdminUiPlugin.init({
			route: 'admin',
			port: 3002,
			app: compileUiExtensions({
				outputPath: path.join(__dirname, '../admin-ui'),
				extensions: [ExamplePlugin.uiExtensions],
				devMode: true,
				additionalProcessArguments: ['--disable-host-check'], // turn this off for production
			}),
		}),
		ExamplePlugin.init({}),
		RestPlugin,
		MultiStore,
	],
};
