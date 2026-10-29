import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health/health.controller';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, NotasModule],
  controllers: [HealthController],
})
export class AppModule {}
