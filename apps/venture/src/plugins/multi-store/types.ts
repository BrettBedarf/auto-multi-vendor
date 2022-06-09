import '@vendure/core';
import { Asset } from '@vendure/core';

declare module '@vendure/core' {
	interface CustomChannelFields {
		displayName: string;
		logo: Asset;
		subdomain: string;
		deployedUrl: string;
		primaryColor: string;
		secondaryColor: string;
	}
}
