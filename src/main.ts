import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@common/config';
import { ConfigSchema } from './config/config.schema';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const configService = app.get<ConfigService<ConfigSchema>>(ConfigService);

  await app.listen(configService.get('PORT'), configService.get('HOST'), () => {
    logger.log(
      `Started at ${configService.get('HOST')}:${configService.get('PORT')}`,
    );
  });
}
bootstrap();
