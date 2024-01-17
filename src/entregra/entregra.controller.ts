import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EntregraService } from './entregra.service';
import { Prisma } from '@prisma/client';
import { CreateEntregaDto } from './DTO/EntregaCreate';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
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

  @Get(':id')
  async GetById(@Param('id') id: string){
    return this.entregraService.findById(id);
  }

  @Get('findallforpessoas/:id/take/:take/skip/:skip/:filter?')
  async GetAllForPessoas(
    @Param('id') id: string,
    @Param('take') take:string,
     @Param('skip') skip:string, 
     @Param('filter') filter?:string
     
     ){
    return this.entregraService.findAllForPessoas(id,take,skip,filter);
  }

}
