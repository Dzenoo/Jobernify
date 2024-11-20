import { Module } from '@nestjs/common';

import { SeekersModule } from './models/seekers/seekers.module';
import { EmployersModule } from './models/employers/employers.module';
import { JobsModule } from './models/jobs/jobs.module';
import { ApplicationsModule } from './models/applications/applications.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { S3Module } from './common/s3/s3.module';
import { AuthModule } from './authentication/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_DB_URL'),
          dbName: configService.get<string>('MONGO_DB_NAME'),
        };
      },
    }),
    AuthModule,
    SeekersModule,
    EmployersModule,
    JobsModule,
    ApplicationsModule,
    ReviewsModule,
    S3Module,
  ],
})
export class AppModule {}
