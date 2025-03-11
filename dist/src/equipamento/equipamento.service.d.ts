import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class EquipamentoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEquipamentoDTO: Prisma.EquipamentoCreateInput): Promise<{
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
    } | {
        error: any;
    }>;
    update(id: string, updateEquipamentoDTO: Prisma.EquipamentoUpdateInput): Promise<{
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
    } | {
        error: any;
    }>;
    findAll(take: string, skip: string, filter: string): Promise<{
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
    }[] | {
        error: any;
    }>;
    findAllNoFilter(): Promise<{
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
    }[] | {
        error: any;
    }>;
    findById(id: string): Promise<{
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
    } | {
        error: any;
    }>;
}
