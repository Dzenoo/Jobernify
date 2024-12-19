import { Module } from '@nestjs/common';

import { AiService } from './ai.service';
import { AiGateway } from './ai.gateway';

@Module({
  providers: [AiService, AiGateway],
  exports: [AiService],
})
export class AiModule {}
