import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = await app.resolve(ConfigService);
  const logger = await app.resolve(Logger);

  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
    }),
  );

  app.use(helmet());

  app.enableCors({});

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(3000);
}
bootstrap();
