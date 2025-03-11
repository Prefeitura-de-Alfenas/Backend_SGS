import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPermissaoChangeUser } from './inteface/interface';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPermissios(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    permissaoChangeUser({ userId, permissionId }: IPermissaoChangeUser): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    findAllPermissaoUser(id: string): Promise<{
        permissoes: {
            usuarioId: string;
            permissaoId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUsuario(id: string, createUsuarioDto: Prisma.UsuarioUpdateInput): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        error: string;
    }>;
    findById(id: string): Promise<{
        equipamento: {
            id: string;
            nome: string;
            responsavel: string;
            sobre: string;
            observacao: string;
            cep: string;
            logradouro: string;
            complemento: string;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changeStatus(id: string): Promise<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        error: string;
    }>;
    create(createUsuarioDto: Prisma.UsuarioCreateInput): Promise<{
        error: string;
    } | {
        senha: any;
        id: string;
        nome: string;
        email: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
        error?: undefined;
    }>;
    findbyemail(email: string): Promise<{
        permissoes: string[];
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        equipamento: {
            id: string;
            nome: string;
            responsavel: string;
            sobre: string;
            observacao: string;
            cep: string;
            logradouro: string;
            complemento: string;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        nome: string;
        email: string;
        senha: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createpermissao(createPermissaoDto: Prisma.PermissaoCreateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
