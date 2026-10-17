import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Response time middleware
  app.use((req: any, res: any, next: any) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      res.setHeader('X-Response-Time', `${duration}ms`);
    });
    next();
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Content API')
    .setDescription('Bilingual content platform API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('contents', 'Content management')
    .addTag('categories', 'Category management')
    .addTag('completed', 'Reading progress')
    .addTag('votes', 'Voting system')
    .addTag('weather', 'Weather utilities')
    .addTag('upload', 'File uploads')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT) || 4000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running at http://0.0.0.0:${port}/api`);
  console.log(`Swagger docs at http://0.0.0.0:${port}/docs`);
}
bootstrap();