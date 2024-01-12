import { Module } from '@nestjs/common';
import { BeneficioService } from './beneficio.service';
import { BeneficioController } from './beneficio.controller';

@Module({
  controllers: [BeneficioController],
  providers: [BeneficioService],
})
export class BeneficioModule {}
