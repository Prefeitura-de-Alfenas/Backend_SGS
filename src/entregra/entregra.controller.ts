import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EntregraService } from './entregra.service';
import { Prisma } from '@prisma/client';
import { CreateEntregaDto } from './DTO/EntregaCreate';

@Controller('entregra')
export class EntregraController {
  constructor(private readonly entregraService: EntregraService) {}

  @Post()
  async Create(@Body() createEtnregaDTO:CreateEntregaDto){
      return this.entregraService.create(createEtnregaDTO)
  }

  @Get('findall/:take/skip/:skip/:filter?')
  async GetAll(@Param('take') take:string, @Param('skip') skip:string, @Param('filter') filter?:string){
    return this.entregraService.findAll(take,skip,filter);
  }

}
