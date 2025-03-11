import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}
  @Get('/backup')
  async backup() {
    await this.pessoaService.importDataFromCsv();
    return 'Data imported successfully';
  }

  @Get(':take/skip/:skip/:filter?')
  async findall(
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
  ) {
    return this.pessoaService.findAll(take, skip, filter);
  }

  @Get('datauserfind/:dateinicial/datefinal/:datefinal/:filter?')
  async findallForRelatorioPorData(
    @Param('dateinicial') dateinicial: string,
    @Param('datefinal') datefinal: string,
    @Param('filter') filter?: string,
  ) {
    return this.pessoaService.findAllRelatorioPorData(
      dateinicial,
      datefinal,
      filter,
    );
  }

  @Post()
  async create(@Body() createPessoaDto: Prisma.PessoaCreateInput) {
    return this.pessoaService.create(createPessoaDto);
  }

  @Get(':id')
  async findbyid(@Param('id') id: string) {
    return this.pessoaService.findById(id);
  }

  @Get('entrega/:id')
  async findbyidEntrega(@Param('id') id: string) {
    return this.pessoaService.findbyidEntrega(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePessoaDto: Prisma.PessoaUpdateInput,
  ) {
    return this.pessoaService.update(id, updatePessoaDto);
  }

  @Get('/familiares/:id/:take/skip/:skip/:filter?')
  async findAllFamiliares(
    @Param('id') id: string,
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
  ) {
    return this.pessoaService.findAllFamiliares(id, take, skip, filter);
  }

  @Patch('changeresponsavel/:idFamilar')
  async chagneResponsavelFamiliar(@Param('idFamilar') idFamilar: string) {
    return this.pessoaService.changeResponsavelFamiliar(idFamilar);
  }

  @Patch('changestatus/:id')
  async changeStatusPessoa(@Param('id') id: string) {
    return this.pessoaService.changeStatus(id);
  }
  @Roles(['Admin'])
  @Get('findallinative/:take/skip/:skip/:filter?')
  async findallInativePessoas(
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
  ) {
    return this.pessoaService.findAllInativePessoas(take, skip, filter);
  }
}
