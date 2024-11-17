import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from './config/app/config.module';
import { MongooseConfigModule } from './config/database/mongodb/config.module';

@Module({
  imports: [AppConfigModule, MongooseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
