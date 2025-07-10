"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BeneficioService = class BeneficioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async AddBeneficioPessoa(id, pessoaid) {
        const pessoa = await this.prisma.pessoa.findUnique({
            where: { id: pessoaid },
            include: {
                beneficios: true,
            },
        });
        if (!pessoa) {
            return { error: 'Pessoa não existe no sistema' };
        }
        if (pessoa.pessoaId !== null) {
            return { error: 'Pessoa não é o chefe da familia' };
        }
        const result = pessoa.beneficios.find((beneficio) => beneficio.beneficioId === id.toString());
        if (result) {
            await this.prisma.pessoasOnBeneficios.delete({
                where: {
                    pessoaId_beneficioId: {
                        pessoaId: pessoa.id,
                        beneficioId: id.toString(),
                    },
                },
            });
        }
        else {
            await this.prisma.pessoasOnBeneficios.create({
                data: {
                    pessoaId: pessoa.id,
                    beneficioId: id.toString(),
                },
            });
        }
        return pessoa;
    }
    async create(createBeneficioDTO) {
        try {
            const beneficio = await this.prisma.beneficio.create({
                data: createBeneficioDTO,
            });
            return beneficio;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findById(id) {
        try {
            const beneficio = await this.prisma.beneficio.findUnique({
                where: {
                    id,
                },
            });
            if (!beneficio) {
                return { error: 'Beneficio não existe no sistema' };
            }
            return beneficio;
        }
        catch (error) {
            return error.message;
        }
    }
    async findAll(take, skip, filter) {
        try {
            const takeNumber = parseInt(take);
            const skipNumber = parseInt(skip);
            const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
            const beneficio = await this.prisma.beneficio.findMany({
                where: {
                    nome: {
                        contains: filter,
                    },
                    status: 'ativo',
                },
                orderBy: {
                    nome: 'asc',
                },
                include: {
                    pessoas: true,
                },
                take: takeNumber,
                skip: page,
            });
            return beneficio;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async update(id, updateBeneficioDTO) {
        try {
            const beneficio = await this.prisma.beneficio.update({
                where: { id: id },
                data: updateBeneficioDTO,
            });
            return beneficio;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findAllBeneficio() {
        try {
            const belneficios = await this.prisma.beneficio.findMany({
                orderBy: {
                    nome: 'asc',
                },
            });
            return belneficios;
        }
        catch (error) {
            return { error: error.message };
        }
    }
};
exports.BeneficioService = BeneficioService;
exports.BeneficioService = BeneficioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BeneficioService);
//# sourceMappingURL=beneficio.service.js.map