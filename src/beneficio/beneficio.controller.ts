import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BeneficioService } from './beneficio.service';
import { Prisma } from '@prisma/client';

@Controller('beneficio')
export class BeneficioController {
  constructor(private readonly beneficioService: BeneficioService) {}

  @Post()
  async create(@Body() createBeneficioDTO:Prisma.BeneficioCreateInput){
     return this.beneficioService.create(createBeneficioDTO)
  }

  @Get(':id')
  async findbyid(@Param('id') id: string){
   return this.beneficioService.findById(id);
  }

  @Get('findall/:take/skip/:skip/:filter?')
  async GetAll(@Param('take') take:string, @Param('skip') skip:string, @Param('filter') filter?:string){
    return this.beneficioService.findAll(take,skip,filter);
  }

  @Patch(':id')
  async Update(@Param('id') id: string,@Body() updateBeneficioDTO: Prisma.BeneficioUpdateInput){
    return this.beneficioService.update(id,updateBeneficioDTO);
  }

  @Patch(':id/pessoa/:pessoaid')
  async AddBeneficioPessoa(@Param('id') id: string,@Param('pessoaid') pessoaid: string){
    console.log('edjfçlskjf')
    return this.beneficioService.AddBeneficioPessoa(id,pessoaid);
  }
}
