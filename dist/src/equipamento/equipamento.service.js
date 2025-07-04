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
exports.EquipamentoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EquipamentoService = class EquipamentoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEquipamentoDTO) {
        try {
            const equipamento = await this.prisma.equipamento.create({
                data: createEquipamentoDTO,
            });
            return equipamento;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async update(id, updateEquipamentoDTO) {
        try {
            const equipamento = await this.prisma.equipamento.update({
                where: { id: id },
                data: updateEquipamentoDTO,
            });
            return equipamento;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findAll(take, skip, filter) {
        try {
            const takeNumber = parseInt(take);
            const skipNumber = parseInt(skip);
            const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
            const equipamentos = await this.prisma.equipamento.findMany({
                where: {
                    nome: {
                        contains: filter,
                    },
                    status: 'ativo',
                },
                orderBy: {
                    nome: 'asc',
                },
                take: takeNumber,
                skip: page,
            });
            return equipamentos;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findAllNoFilter() {
        try {
            const equipamentos = await this.prisma.equipamento.findMany({
                orderBy: {
                    nome: 'asc',
                },
            });
            const fonteDeRendas = await this.prisma.fonteRenda.findMany({
                orderBy: {
                    nome: 'asc',
                },
            });
            const deficiencias = await this.prisma.deficiencia.findMany({
                orderBy: {
                    nome: 'asc',
                },
            });
            return {
                equipamentos,
                fonteDeRendas,
                deficiencias,
            };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findById(id) {
        try {
            const equipamento = await this.prisma.equipamento.findUnique({
                where: { id },
            });
            return equipamento;
        }
        catch (error) {
            return { error: error.message };
        }
    }
};
exports.EquipamentoService = EquipamentoService;
exports.EquipamentoService = EquipamentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EquipamentoService);
//# sourceMappingURL=equipamento.service.js.map