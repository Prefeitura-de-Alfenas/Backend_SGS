import { Prisma } from '@prisma/client';
import { UsuarioService } from './usuario.service';
import { IPermissaoChangeUser } from './inteface/interface';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
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
    createpermissao(createPermissaoDto: Prisma.PermissaoCreateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    findall(): Promise<({
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
    findAllPermissios(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
    findAllPermissiosUser(id: string): Promise<{
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
    permissaoChangeUser(data: IPermissaoChangeUser): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    findbyid(id: string): Promise<any>;
    update(id: string): Promise<{
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
}
