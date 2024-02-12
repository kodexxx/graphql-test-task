import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@common/config';
import { ConfigSchema } from '../../../config/config.schema';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService<ConfigSchema>) {
    super({
      ...(configService.get('PRISMA_DEBUG_LOGS')
        ? { log: ['query', 'info', 'warn', 'error'] }
        : {}),
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
