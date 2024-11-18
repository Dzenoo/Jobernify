import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Module({
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
