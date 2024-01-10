import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EquipamentoService } from './equipamento.service';
import { Prisma } from '@prisma/client';

@Controller('equipamento')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  async Create(@Body() createEquipamentoDTO: Prisma.EquipamentoCreateInput){
      return this.equipamentoService.create(createEquipamentoDTO)
  }

  @Patch(':id')
  async Update(@Param('id') id: string,@Body() updateEquipamentoDTO: Prisma.EquipamentoUpdateInput){
    return this.equipamentoService.update(id,updateEquipamentoDTO);
  }

  @Get('findall')
  async GetAll(){
    return this.equipamentoService.findAll();
  }

  @Get(':id')
  async GetById(@Param('id') id: string){
    return this.equipamentoService.findById(id);
  }
}
