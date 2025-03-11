"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UsuarioService = class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllPermissios() {
        const permissoes = await this.prisma.permissao.findMany();
        return permissoes;
    }
    async permissaoChangeUser({ userId, permissionId }) {
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
        const result = usuario.permissoes.find((response) => response.permissaoId === permissionId);
        if (result) {
            await this.prisma.usuariosOnPermissoes.delete({
                where: {
                    usuarioId_permissaoId: {
                        usuarioId: usuario.id,
                        permissaoId: permissaoQuery.id,
                    },
                },
            });
        }
        else {
            await this.prisma.usuariosOnPermissoes.create({
                data: {
                    usuarioId: usuario.id,
                    permissaoId: permissaoQuery.id,
                },
            });
        }
        return { success: 'Atualizado com sucesso' };
    }
    async findAllPermissaoUser(id) {
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
    async updateUsuario(id, createUsuarioDto) {
        const { email, senha, ...otherFields } = createUsuarioDto;
        const emailExists = await this.prisma.usuario.findFirst({
            where: {
                email: email,
                id: { not: id },
            },
        });
        const emailExistsId = await this.prisma.usuario.findFirst({
            where: {
                id: createUsuarioDto.id,
            },
        });
        const hashedSenha = senha
            ? await bcrypt.hash(senha, 10)
            : undefined;
        if (emailExists) {
            if (emailExists.email !== emailExistsId.email) {
                return { error: 'Email já existe em nosso sistema' };
            }
        }
        let data = {
            senha: hashedSenha,
            ...otherFields,
        };
        if (createUsuarioDto.email) {
            if (emailExistsId.email !== createUsuarioDto.email) {
                data = {
                    email,
                    senha: hashedSenha,
                    ...otherFields,
                };
            }
        }
        const usuario = await this.prisma.usuario.update({
            where: { id },
            data,
        });
        return usuario;
    }
    async findById(id) {
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
    async changeStatus(id) {
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
    async create(createUsuarioDto) {
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
    async findbyemail(email) {
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
        const nomesPermissoes = usuario.permissoes.map((role) => role.permissao.nome);
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
    async createpermissao(createPermissaoDto) {
        const permissao = await this.prisma.permissao.create({
            data: createPermissaoDto,
        });
        return permissao;
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map