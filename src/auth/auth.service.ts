import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bccrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { UserPayload } from './models/membro-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Prisma.UsuarioCreateInput): UserToken {
    //trasforme membro em jwt

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.nome,
      role: user.permissoes,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.permissoes,
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findbyemail(email);

    if (user) {
      //checar se a senha corresponde a hash
      const isPasswordValid = await bccrypt.compare(senha, user.senha);
      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    //se chegar aqui querdize que não encontrou user ou a senha e email
    throw new Error('Email ou Senha está incorreta');
  }
}
