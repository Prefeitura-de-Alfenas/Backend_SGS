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

  @Get('findall/:take/skip/:skip/:filter?')
  async GetAll(@Param('take') take:string, @Param('skip') skip:string, @Param('filter') filter?:string){
    return this.equipamentoService.findAll(take,skip,filter);
  }

  @Get(':id')
  async GetById(@Param('id') id: string){
    return this.equipamentoService.findById(id);
  }

  @Get()
  async GetAllFilter(){
    return this.equipamentoService.findAllNoFilter();
  }

}
