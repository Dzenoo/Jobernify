import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from './configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: MongooseConfig,
      imports: [ConfigModule],
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseConfigModule {}
