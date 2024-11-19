import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/app/config.module';
import { MongooseConfigModule } from './config/database/mongodb/config.module';
import { SeekersModule } from './models/seekers/seekers.module';
import { EmployersModule } from './models/employers/employers.module';
import { JobsModule } from './models/jobs/jobs.module';
import { ApplicationsModule } from './models/applications/applications.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { S3Module } from './common/s3/s3.module';
import { NodemailerModule } from './common/email/nodemailer.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseConfigModule,
    AuthModule,
    SeekersModule,
    EmployersModule,
    JobsModule,
    ApplicationsModule,
    ReviewsModule,
    S3Module,
    NodemailerModule,
  ],
})
export class AppModule {}
