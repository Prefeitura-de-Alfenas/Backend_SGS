import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BeneficioService {
    private prisma;
    constructor(prisma: PrismaService);
    AddBeneficioPessoa(id: string, pessoaid: string): Promise<({
        beneficios: {
            pessoaId: string;
            beneficioId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
        motivoexclusao: string;
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
        usuarioId: string;
        createdAt: Date;
        updatedAt: Date;
    }) | {
        error: string;
    }>;
    create(createBeneficioDTO: Prisma.BeneficioCreateInput): Promise<{
        id: string;
        nome: string;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
        status: import(".prisma/client").$Enums.status_code;
        createdAt: Date;
        updatedAt: Date;
    } | {
        error: any;
    }>;
    findById(id: string): Promise<any>;
    findAll(take: string, skip: string, filter: string): Promise<({
        pessoas: {
            pessoaId: string;
            beneficioId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        nome: string;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
        status: import(".prisma/client").$Enums.status_code;
        createdAt: Date;
        updatedAt: Date;
    })[] | {
        error: any;
    }>;
    update(id: string, updateBeneficioDTO: Prisma.BeneficioUpdateInput): Promise<{
        id: string;
        nome: string;
        descricao: string;
        categoria: string;
        valor: Prisma.Decimal;
        status: import(".prisma/client").$Enums.status_code;
        createdAt: Date;
        updatedAt: Date;
    } | {
        error: any;
    }>;
}
