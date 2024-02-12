import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigSchema {
  @IsNumber()
  @Type(() => Number)
  PORT = 8080;

  @IsString()
  HOST = '0.0.0.0';

  @IsString()
  SERVICE_NAME = 'newgmedia-test-api';

  @IsString()
  @IsOptional()
  NODE_ENV?: string;

  @IsString()
  DATABASE_URL: string;

  @IsBoolean()
  @Type(() => Boolean)
  PRISMA_DEBUG_LOGS = false;
}
