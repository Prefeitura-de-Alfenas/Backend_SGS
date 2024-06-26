import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  //prod
  //app.useStaticAssets(path.join(__dirname , "../uploads"));
  app.useStaticAssets(path.join(__dirname, '../uploads'));
  await app.listen(3015);
}
bootstrap();
