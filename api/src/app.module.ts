import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './authentication/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { SeekersModule } from './models/seekers/seekers.module';
import { EmployersModule } from './models/employers/employers.module';
import { JobsModule } from './models/jobs/jobs.module';
import { ApplicationsModule } from './models/applications/applications.module';

import { APP_GUARD } from '@nestjs/core';

import { CleanupService } from './common/cleanup/cleanup.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
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
  ],
  providers: [
    CleanupService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
