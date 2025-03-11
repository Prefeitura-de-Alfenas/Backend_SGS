import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArquivo } from './DTO/createArquivo';
export declare class ArquivoService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllForPessoas(id: string, take: string, skip: string, filter: string): Promise<({
        pessoa: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date | null;
            observacao: string | null;
            cep: string;
            logradouro: string;
            complemento: string | null;
            bairro: string;
            localidade: string;
            numero: string;
            uf: string;
            status: import(".prisma/client").$Enums.status_code;
            email: string | null;
            telefone: string | null;
            equipamentoId: string;
            cpf: string;
            sexo: string;
            datanascimento: Date;
            rg: string | null;
            parentesco: string | null;
            escolaridade: string;
            estadocivil: string;
            renda: import("@prisma/client/runtime/library").Decimal;
            ctpsassinada: number;
            ppcl: number;
            gestante: number;
            observacaorestrita: string | null;
            pessoaId: string | null;
        };
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        pessoId: string;
        url: string;
    })[] | {
        error: any;
    }>;
    uploadFile(file: any, data: CreateArquivo): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        pessoId: string;
        url: string;
    }>;
    getFile(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        pessoId: string;
        url: string;
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
