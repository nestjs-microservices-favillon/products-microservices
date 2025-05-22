import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport : Transport.TCP,
    options : {
      port : envs.port,
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen();
  // await app.startAllMicroservices(); //  Compatibilidad en REST Y TCP // si no instalacion solo de  @nestjs/microservices

  logger.log(`Products Microservice running on port ${ envs.port }`);
}
bootstrap();
