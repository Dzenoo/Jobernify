import { forwardRef, Module } from '@nestjs/common';

import { JobsModule } from 'src/models/jobs/jobs.module';
import { SeekersModule } from 'src/models/seekers/seekers.module';

import { AiService } from './ai.service';
import { AiGateway } from './ai.gateway';

@Module({
  imports: [forwardRef(() => SeekersModule), forwardRef(() => JobsModule)],
  providers: [AiService, AiGateway],
  exports: [AiService],
})
export class AiModule {}
