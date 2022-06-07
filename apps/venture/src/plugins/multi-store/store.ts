import { OnApplicationBootstrap } from '@nestjs/common';
import {
	EventBus,
	PluginCommonModule,
	VendurePlugin,
	ChannelEvent,
} from '@vendure/core';
import { filter } from 'rxjs/operators';

@VendurePlugin({
	imports: [PluginCommonModule],
})
export class MultiStore implements OnApplicationBootstrap {
	constructor(private eventBus: EventBus) {}

	async onApplicationBootstrap() {
		this.eventBus
			.ofType(ChannelEvent)
			.pipe(filter(event => event.type === 'PaymentSettled'))
			.subscribe(event => {
				// do some action when this event fires
			});
	}
}
