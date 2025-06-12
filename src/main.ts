// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not in DTO
    forbidNonWhitelisted: true, // throws error on extra properties
    transform: true, // transforms payloads to DTO instances
  }));

  await app.listen(3000);
}
bootstrap();
