import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function initializeServer() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://jobernify.com', 'http://localhost:3000'],
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
initializeServer();
