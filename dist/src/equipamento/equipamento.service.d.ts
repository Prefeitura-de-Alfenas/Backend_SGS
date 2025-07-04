import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class EquipamentoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEquipamentoDTO: Prisma.EquipamentoCreateInput): Promise<{
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
    } | {
        error: any;
    }>;
    update(id: string, updateEquipamentoDTO: Prisma.EquipamentoUpdateInput): Promise<{
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
    } | {
        error: any;
    }>;
    findAll(take: string, skip: string, filter: string): Promise<{
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
    }[] | {
        error: any;
    }>;
    findAllNoFilter(): Promise<{
        equipamentos: {
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
        }[];
        fonteDeRendas: {
            id: string;
            nome: string;
        }[];
        deficiencias: {
            id: string;
            nome: string;
        }[];
        error?: undefined;
    } | {
        error: any;
        equipamentos?: undefined;
        fonteDeRendas?: undefined;
        deficiencias?: undefined;
    }>;
    findById(id: string): Promise<{
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
    } | {
        error: any;
    }>;
}
