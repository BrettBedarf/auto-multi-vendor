import { Controller, Get } from '@nestjs/common';
import { Ctx, ChannelService, RequestContext } from '@vendure/core';

@Controller('channels')
export class ChannelsController {
	constructor(private channelService: ChannelService) {}

	@Get()
	findAll(@Ctx() ctx: RequestContext) {
		return this.channelService.findAll(ctx);
	}
}
