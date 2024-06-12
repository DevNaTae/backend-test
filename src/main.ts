import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = +configService.get('SERVER_PORT');
  await app
    .listen(port)
    .then(() => {
      console.log(`Up at ${port}`);
    })
    .catch((err) => {
      console.log('Down:(' + err);
    });
}
bootstrap();
