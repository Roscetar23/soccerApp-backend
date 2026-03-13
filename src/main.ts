import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  // Enable CORS so the frontend can easily bypass same-origin policy locally
  app.enableCors();

  // Validate payloads automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip out properties that don't have decorators
      forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
      transform: true, // transform payloads to match the expected DTO class types
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
