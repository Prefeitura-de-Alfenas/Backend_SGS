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
        updatedAt: Date | null;
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
            createdAt: Date;
            updatedAt: Date | null;
            usuarioId: string;
            permissaoId: string;
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    }>;
    updateUsuario(id: string, createUsuarioDto: Prisma.UsuarioUpdateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    } | {
        error: string;
    }>;
    findById(id: string): Promise<{
        equipamento: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date | null;
            responsavel: string;
            sobre: string;
            observacao: string;
            cep: string;
            logradouro: string;
            complemento: string | null;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
        };
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    }>;
    changeStatus(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    } | {
        error: string;
    }>;
    create(createUsuarioDto: Prisma.UsuarioCreateInput): Promise<{
        error: string;
    } | {
        senha: any;
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        telefone: string;
        equipamentoId: string;
        error?: undefined;
    }>;
    findbyemail(email: string): Promise<{
        permissoes: string[];
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    }>;
    findAll(): Promise<({
        equipamento: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date | null;
            responsavel: string;
            sobre: string;
            observacao: string;
            cep: string;
            logradouro: string;
            complemento: string | null;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
        };
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        senha: string;
        telefone: string;
        equipamentoId: string;
    })[]>;
    createpermissao(createPermissaoDto: Prisma.PermissaoCreateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
}
