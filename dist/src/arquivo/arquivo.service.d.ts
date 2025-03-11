import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArquivo } from './DTO/createArquivo';
export declare class ArquivoService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllForPessoas(id: string, take: string, skip: string, filter: string): Promise<({
        pessoa: {
            id: string;
            nome: string;
            cpf: string;
            sexo: string;
            telefone: string;
            email: string;
            datanascimento: Date;
            rg: string;
            parentesco: string;
            escolaridade: string;
            estadocivil: string;
            renda: import("@prisma/client/runtime/library").Decimal;
            ctpsassinada: number;
            ppcl: number;
            gestante: number;
            observacao: string;
            observacaorestrita: string;
            cep: string;
            logradouro: string;
            complemento: string;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
            equipamentoId: string;
            pessoaId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        nome: string;
        url: string;
        pessoId: string;
        createdAt: Date;
        updatedAt: Date;
    })[] | {
        error: any;
    }>;
    uploadFile(file: any, data: CreateArquivo): Promise<{
        id: string;
        nome: string;
        url: string;
        pessoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getFile(id: string): Promise<{
        id: string;
        nome: string;
        url: string;
        pessoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteFile(id: string): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    deleteArquivo(file: any): void;
}
