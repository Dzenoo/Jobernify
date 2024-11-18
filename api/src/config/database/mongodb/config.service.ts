import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService {
  constructor(private configService: ConfigService) {}

  get mongoDbUrl(): string {
    return this.configService.get<string>('MONGO_DB_URL');
  }

  get mongoDbName(): string {
    return this.configService.get<string>('MONGO_DB_NAME');
  }
}
