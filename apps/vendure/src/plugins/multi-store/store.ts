import { OnApplicationBootstrap } from '@nestjs/common';
import {
	EventBus,
	PluginCommonModule,
	VendurePlugin,
	ChannelEvent,
	CustomChannelFields,
} from '@vendure/core';
import { filter } from 'rxjs/operators';
import { deploy } from './actions/deploy';
import * as ChannelCustomFields from './types'; // needed for ts-node to shut up

@VendurePlugin({
	imports: [PluginCommonModule],
})
export class MultiStore implements OnApplicationBootstrap {
	constructor(private eventBus: EventBus) {}
	async onApplicationBootstrap() {
		this.eventBus
			.ofType(ChannelEvent)
			.pipe(filter(event => event.type === 'created'))
			.subscribe(async event => {
				// do some action when this event fires
				const apiUrl = process.env.VENDURE_SHOP_API_URL;
				if (!apiUrl) {
					throw new Error(
						'Missing VENDURE_SHOP_API_URL environment variable! Cannot create new frontend deployment without it.'
					);
				}
				const gitRepo = process.env.GIT_REPO;
				if (!gitRepo) {
					throw new Error(
						'Missing GIT_REPO environment variable! Cannot create new frontend deployment without it.'
					);
				}
				const channelRestUrl = process.env.VENDURE_CHANNEL_REST_URL;
				if (!channelRestUrl) {
					throw new Error('VENDURE_CHANNEL_REST_URL environment variable! Cannot create new frontend deployment without it')
				}
				const imageDomains = process.env.IMAGE_DOMAINS
				if (!imageDomains) {
					throw new Error('Missing IMAGE_DOMAINS environment variable! Needed to tell nextjs which domains have images.')
				}

				const deployResult = await deploy({
					storeName: event.entity.code,
					subdomain: event.entity.customFields.subdomain,
					channelToken: event.entity.token,
					apiUrl,
					gitRepo,
					channelRestUrl,
					imageDomains
				});
			});
	}
}
