import { ArquivoService } from './arquivo.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { CreateArquivo } from './DTO/createArquivo';
export declare class ArquivoController {
    private readonly arquivoService;
    constructor(arquivoService: ArquivoService);
    GetAllForPessoas(id: string, take: string, skip: string, filter?: string): Promise<({
        pessoa: {
            id: string;
            nome: string;
            cpf: string;
            sexo: string;
            whastapp: number;
            telefone: string;
            email: string;
            datanascimento: Date;
            rg: string;
            parentesco: string;
            escolaridade: string;
            estadocivil: string;
            renda: Prisma.Decimal;
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
    getFile(res: Response, id: string): Promise<void | Response<any, Record<string, any>>>;
    deleteFile(id: string): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
}
