import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsuarioService } from './usuario.service';
import { IPermissaoChangeUser } from './inteface/interface';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Post()
  async create(@Body() createUsuarioDto: Prisma.UsuarioCreateInput) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('permissao')
  async createpermissao(
    @Body() createPermissaoDto: Prisma.PermissaoCreateInput,
  ) {
    return this.usuarioService.createpermissao(createPermissaoDto);
  }
  @Get()
  async findall() {
    return this.usuarioService.findAll();
  }

  @Get('findpermissaouser')
  async findAllPermissios() {
    return this.usuarioService.findAllPermissios();
  }

  @Get('findpermissaouser/:id')
  async findAllPermissiosUser(@Param('id') id: string) {
    return this.usuarioService.findAllPermissaoUser(id);
  }

  @Patch('permissachange')
  async permissaoChangeUser(@Body() data: IPermissaoChangeUser) {
    return this.usuarioService.permissaoChangeUser(data);
  }

  @Get(':id')
  async findbyid(@Param('id') id: string) {
    try {
      return this.usuarioService.findById(id);
    } catch (error) {
      return error.message;
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string) {
    return this.usuarioService.changeStatus(id);
  }

  @Patch('update/:id')
  async updateUsuario(
    @Param('id') id: string,
    @Body() createUsuarioDto: Prisma.UsuarioUpdateInput,
  ) {
    return this.usuarioService.updateUsuario(id, createUsuarioDto);
  }
}
