import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BeneficioService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findById(id: string): Promise<any>;
    findAll(take: string, skip: string, filter: string): Promise<({
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
    update(id: string, updateBeneficioDTO: Prisma.BeneficioUpdateInput): Promise<{
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
}
