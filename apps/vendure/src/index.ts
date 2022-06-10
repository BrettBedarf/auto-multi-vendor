import { bootstrap } from '@vendure/core';
import { config } from './vendure-config';

// use .env file in dev mode only (production should be injected by platform)
if (
	process.env.NODE_ENV?.toLowerCase() === 'dev' ||
	process.env.NODE_ENV?.toLowerCase() === 'development'
) {
	import('dotenv/config');
}
bootstrap(config).catch(err => {
	// tslint:disable-next-line:no-console
	console.log(err);
});