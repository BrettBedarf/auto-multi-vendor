import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ChannelsController } from './controllers/channels.controller';

@VendurePlugin({
	imports: [PluginCommonModule],
	controllers: [ChannelsController],
})
export class RestPlugin {}
