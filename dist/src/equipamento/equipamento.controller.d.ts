import { EquipamentoService } from './equipamento.service';
import { Prisma } from '@prisma/client';
export declare class EquipamentoController {
    private readonly equipamentoService;
    constructor(equipamentoService: EquipamentoService);
    Create(createEquipamentoDTO: Prisma.EquipamentoCreateInput): Promise<{
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
    Update(id: string, updateEquipamentoDTO: Prisma.EquipamentoUpdateInput): Promise<{
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
    GetAll(take: string, skip: string, filter?: string): Promise<{
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
    GetById(id: string): Promise<{
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
    GetAllFilter(): Promise<{
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
}
