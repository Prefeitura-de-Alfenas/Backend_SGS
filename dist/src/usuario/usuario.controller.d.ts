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
        email: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
        error?: undefined;
    }>;
    createpermissao(createPermissaoDto: Prisma.PermissaoCreateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findall(): Promise<({
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
    findAllPermissios(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllPermissiosUser(id: string): Promise<{
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
}
