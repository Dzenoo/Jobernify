import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';

import { AppConfigModule } from './config/app/config.module';
import { MongooseConfigModule } from './config/database/mongodb/config.module';
import { SeekersModule } from './models/seekers/seekers.module';
import { EmployersModule } from './models/employers/employers.module';
import { JobsModule } from './models/jobs/jobs.module';
import { ApplicationsModule } from './models/applications/applications.module';
import { ReviewsModule } from './models/reviews/reviews.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseConfigModule,
    SeekersModule,
    EmployersModule,
    JobsModule,
    ApplicationsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
