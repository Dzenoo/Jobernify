import { forwardRef, Module } from '@nestjs/common';

import { JobsModule } from '@/models/jobs/jobs.module';
import { SeekersModule } from '@/models/seekers/seekers.module';

import { AiService } from '@/ai/ai.service';
import { AiGateway } from '@/ai/ai.gateway';

@Module({
  imports: [forwardRef(() => SeekersModule), forwardRef(() => JobsModule)],
  providers: [AiService, AiGateway],
  exports: [AiService],
})
export class AiModule {}
