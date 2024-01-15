import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Prisma } from '@prisma/client';
import { filter } from 'rxjs';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}
  @Get(':take/skip/:skip/:filter?')
 async findall(@Param('take') take:string, @Param('skip') skip:string, @Param('filter') filter?:string){
  return this.pessoaService.findAll(take,skip,filter);
 }

 @Post()
 async create(@Body() createPessoaDto:Prisma.PessoaCreateInput){
     return this.pessoaService.create(createPessoaDto)
 }

 @Get(':id')
 async findbyid(@Param('id') id: string){
  return this.pessoaService.findById(id);
 }

 @Patch(':id')
 async update(@Param('id') id: string,@Body() updatePessoaDto:Prisma.PessoaUpdateInput){
  return this.pessoaService.update(id,updatePessoaDto)
 }

 @Get('/familiares/:id/:take/skip/:skip/:filter?')
 async findAllFamiliares(
  @Param('id') id: string,
  @Param('take') take:string, 
  @Param('skip') skip:string, 
  @Param('filter') filter?:string
  ){
  return this.pessoaService.findAllFamiliares(id,take,skip,filter);
 }

 @Patch('changeresponsavel/:idFamilar')
 async chagneResponsavelFamiliar(@Param('idFamilar') idFamilar:string){
  return this.pessoaService.changeResponsavelFamiliar(idFamilar);
 }

 @Patch('changestatus/:id')
 async changeStatusPessoa(@Param('id') id: string){
  console.log("id",id)
  return this.pessoaService.changeStatus(id)
 }

 @Get('findallinative/:take/skip/:skip/:filter?')
 async findallInativePessoas(@Param('take') take:string, @Param('skip') skip:string, @Param('filter') filter?:string){
  return this.pessoaService.findAllInativePessoas(take,skip,filter);
 }

}
