import { BeneficioService } from './beneficio.service';
import { Prisma } from '@prisma/client';
export declare class BeneficioController {
    private readonly beneficioService;
    constructor(beneficioService: BeneficioService);
    create(createBeneficioDTO: Prisma.BeneficioCreateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
    } | {
        error: any;
    }>;
    findbyid(id: string): Promise<any>;
    GetAll(take: string, skip: string, filter?: string): Promise<({
        pessoas: {
            createdAt: Date;
            updatedAt: Date | null;
            pessoaId: string;
            beneficioId: string;
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
    })[] | {
        error: any;
    }>;
    Update(id: string, updateBeneficioDTO: Prisma.BeneficioUpdateInput): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
    } | {
        error: any;
    }>;
    AddBeneficioPessoa(id: string, pessoaid: string): Promise<({
        beneficios: {
            createdAt: Date;
            updatedAt: Date | null;
            pessoaId: string;
            beneficioId: string;
        }[];
    } & {
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
        renda: Prisma.Decimal;
        ctpsassinada: number;
        ppcl: number;
        gestante: number;
        observacaorestrita: string | null;
        pessoaId: string | null;
    }) | {
        error: string;
    }>;
}
