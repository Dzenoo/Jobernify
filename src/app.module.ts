import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from './config/app/config.module';
import { MongooseConfigModule } from './config/database/mongodb/config.module';
import { ApplicationsModule } from './models/applications/applications.module';
import { EmployersModule } from './models/employers/employers.module';
import { JobsModule } from './models/jobs/jobs.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { SeekersModule } from './models/seekers/seekers.module';

@Module({
  imports: [AppConfigModule, MongooseConfigModule, ApplicationsModule, EmployersModule, JobsModule, ReviewsModule, SeekersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
