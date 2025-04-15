import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mindmap')
    .addBearerAuth()
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .addGlobalResponse({
      status: 403,
      description: 'Unauthorized, remember to include your Bearer Token',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
