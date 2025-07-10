import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EntregraService } from './entregra.service';
import { CreateEntregaAvulsaDto, CreateEntregaDto } from './DTO/EntregaCreate';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BuscaEntrega, DefIndef } from './DTO/BuscaEntrega';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('entregra')
export class EntregraController {
  constructor(private readonly entregraService: EntregraService) {}

  @Post()
  async Create(@Body() createEtnregaDTO: CreateEntregaDto) {
    return this.entregraService.create(createEtnregaDTO);
  }

  @Post('avulso')
  async CreateAvulso(@Body() createEtnregaAvulsoDTO: CreateEntregaAvulsaDto) {
    return this.entregraService.createAvulsa(createEtnregaAvulsoDTO);
  }

  @Get('findall/:take/skip/:skip/:filter?')
  async GetAll(
    @Param('take') take: string,
    @Param('skip') skip: string,
    //@Param('filter') filter?: string,
  ) {
    return this.entregraService.findAll(take, skip);
  }

  @Get(':id')
  async GetById(@Param('id') id: string) {
    return this.entregraService.findById(id);
  }

  @Get('findallforpessoas/:id/take/:take/skip/:skip/:filter?')
  async GetAllForPessoas(
    @Param('id') id: string,
    @Param('take') take: string,
    @Param('skip') skip: string,
    //@Param('filter') filter?: string,
  ) {
    return this.entregraService.findAllForPessoas(id, take, skip);
  }

  @Post('entregarelatoriodate')
  async findallForRelatorioPorData(@Body() getBuscaDto: BuscaEntrega) {
    return this.entregraService.findAllRelatorioPorData(getBuscaDto);
  }
  @Post('entregaavulsarelatorio')
  async findallEntregaAvulsa(@Body() getBuscaDto: BuscaEntrega) {
    return this.entregraService.findAllEntregaAvulsa(getBuscaDto);
  }

  @Patch()
  async update(@Body() body: DefIndef) {
    return this.entregraService.changeStatus(body);
  }
}
