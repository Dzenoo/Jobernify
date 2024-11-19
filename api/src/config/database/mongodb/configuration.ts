import { MongooseModuleOptions } from '@nestjs/mongoose';

import { ConfigService } from '@nestjs/config';

export const MongooseConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
  uri: configService.get<string>('MONGO_DB_URL'),
  dbName: configService.get<string>('MONGO_DB_NAME'),
});
