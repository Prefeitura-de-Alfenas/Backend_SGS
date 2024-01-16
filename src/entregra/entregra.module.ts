import { Module } from '@nestjs/common';
import { EntregraService } from './entregra.service';
import { EntregraController } from './entregra.controller';

@Module({
  controllers: [EntregraController],
  providers: [EntregraService],
})
export class EntregraModule {}
