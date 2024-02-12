import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'json',
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
