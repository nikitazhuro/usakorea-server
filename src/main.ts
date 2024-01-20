import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ['https://admin.autosaya.by', 'https://autosaya.by'],
  });

  await app.listen(5000);
}
bootstrap();
