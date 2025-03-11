import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { IPermissaoChangeUser } from './inteface/interface';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAllPermissios() {
    const permissoes = await this.prisma.permissao.findMany();
    return permissoes;
  }

  async permissaoChangeUser({ userId, permissionId }: IPermissaoChangeUser) {
    const permissaoQuery = await this.prisma.permissao.findUnique({
      where: { id: permissionId },
    });
    if (!permissaoQuery) {
      return { error: 'Permissão não existe' };
    }
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        permissoes: true,
      },
    });

    if (!usuario) {
      return { error: 'Usuario não existe' };
    }

    const result = usuario.permissoes.find(
      (response) => response.permissaoId === permissionId,
    );

    if (result) {
      await this.prisma.usuariosOnPermissoes.delete({
        where: {
          usuarioId_permissaoId: {
            usuarioId: usuario.id,
            permissaoId: permissaoQuery.id,
          },
        },
      });
    } else {
      await this.prisma.usuariosOnPermissoes.create({
        data: {
          usuarioId: usuario.id,
          permissaoId: permissaoQuery.id,
        },
      });
    }

    return { success: 'Atualizado com sucesso' };
  }

  async findAllPermissaoUser(id: string) {
    const permissoesUser = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
      include: {
        permissoes: true,
      },
    });
    return permissoesUser;
  }

  async updateUsuario(id: string, createUsuarioDto: Prisma.UsuarioUpdateInput) {
    const { email, senha, ...otherFields } = createUsuarioDto;

    // Check if the new email already exists in the database
    const emailExists = await this.prisma.usuario.findFirst({
      where: {
        email: email as string, // Explicitly cast to string
        id: { not: id }, // Exclude the current user from the search
      },
    });

    const emailExistsId = await this.prisma.usuario.findFirst({
      where: {
        id: createUsuarioDto.id as string, // Explicitly cast to string
      },
    });

    const hashedSenha: string | undefined = senha
      ? await bcrypt.hash(senha as string, 10)
      : undefined;

    if (emailExists) {
      if (emailExists.email !== emailExistsId.email) {
        return { error: 'Email já existe em nosso sistema' };
      }
    }

    // Hash the password if provided
    let data: Prisma.UsuarioUpdateInput = {
      senha: hashedSenha, // Update password if provided
      ...otherFields, // Include other fields
    };

    if (createUsuarioDto.email) {
      if (emailExistsId.email !== createUsuarioDto.email) {
        data = {
          email,
          senha: hashedSenha, // Update password if provided
          ...otherFields, // Include other fields
        };
      }
    }

    const usuario = await this.prisma.usuario.update({
      where: { id },
      data,
    });

    return usuario;
  }
  async findById(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
      include: {
        equipamento: true,
      },
    });
    return usuario;
  }
  async changeStatus(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      return { error: 'Usuario não existe' };
    }

    const changeUser = await this.prisma.usuario.update({
      where: {
        id,
      },
      data: {
        status: usuario.status == 'ativo' ? 'inativo' : 'ativo',
      },
    });
    return changeUser;
  }

  async create(createUsuarioDto: Prisma.UsuarioCreateInput) {
    const membro = await this.prisma.usuario.findUnique({
      where: {
        email: createUsuarioDto.email,
      },
    });

    if (membro) {
      return { error: 'Usuário já existe' };
    }

    const data = {
      ...createUsuarioDto,
      senha: await bcrypt.hash(createUsuarioDto.senha, 10),
    };

    const usuario = await this.prisma.usuario.create({
      data,
    });

    return {
      ...usuario,
      senha: undefined,
    };
  }

  async findbyemail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email,
      },
      include: {
        permissoes: {
          select: {
            permissao: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    const nomesPermissoes = usuario.permissoes.map(
      (role) => role.permissao.nome,
    );

    return {
      ...usuario,
      permissoes: nomesPermissoes,
    };
  }
  async findAll() {
    const usuario = await this.prisma.usuario.findMany({
      include: {
        equipamento: true,
      },
    });
    return usuario;
  }

  async createpermissao(createPermissaoDto: Prisma.PermissaoCreateInput) {
    const permissao = await this.prisma.permissao.create({
      data: createPermissaoDto,
    });
    return permissao;
  }
}
