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
exports.EntregraService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let EntregraService = class EntregraService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEntregaDTO) {
        try {
            const usuario = await this.prisma.usuario.findUnique({
                where: {
                    id: createEntregaDTO.usuarioId,
                },
            });
            const pessoa = await this.prisma.pessoa.findUnique({
                where: {
                    id: createEntregaDTO.pessoId,
                },
            });
            if (!usuario) {
                return { error: 'Usuario não existe' };
            }
            if (!pessoa) {
                return { error: 'Familia não existe' };
            }
            const entrega = await this.prisma.entrega.create({
                data: createEntregaDTO,
            });
            return entrega;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findAllForPessoas(id, take, skip, filter) {
        try {
            const takeNumber = parseInt(take);
            const skipNumber = parseInt(skip);
            const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
            const entrega = await this.prisma.entrega.findMany({
                where: {
                    pessoId: id,
                    status: 'ativo',
                },
                include: {
                    pessoa: true,
                    beneficio: true,
                },
                take: takeNumber,
                skip: page,
            });
            return entrega;
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
            const entrega = await this.prisma.entrega.findMany({
                where: {
                    status: 'ativo',
                },
                include: {
                    pessoa: true,
                    beneficio: true,
                },
                take: takeNumber,
                skip: page,
            });
            return entrega;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findById(id) {
        try {
            const entrega = await this.prisma.entrega.findUnique({
                where: { id },
                include: {
                    pessoa: true,
                    beneficio: true,
                    equipamento: true,
                    usuario: true,
                },
            });
            return entrega;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async findAllRelatorioPorData({ dateinicial, datefinal, pessoId, usuarioId, equipamentoId, beneficioId, statusid, }) {
        const formattedDateInicial = (0, date_fns_1.format)(new Date(dateinicial), 'yyyy-MM-dd HH:mm:ss');
        const formattedDateFinal = (0, date_fns_1.format)(new Date(datefinal), 'yyyy-MM-dd HH:mm:ss');
        const nextDayDateFinal = (0, date_fns_1.addDays)(formattedDateFinal, 1);
        const whereClause = {
            status: 'ativo',
            datacadastro: {
                gte: new Date(formattedDateInicial),
                lte: new Date(nextDayDateFinal),
            },
        };
        if (pessoId) {
            whereClause.pessoId = pessoId;
        }
        if (equipamentoId) {
            whereClause.equipamentoId = equipamentoId;
        }
        if (usuarioId) {
            whereClause.usuarioId = usuarioId;
        }
        if (beneficioId) {
            whereClause.beneficioId = beneficioId;
        }
        if (statusid) {
            whereClause.status = statusid;
        }
        const entregas = await this.prisma.entrega.findMany({
            where: whereClause,
            include: {
                equipamento: true,
                beneficio: true,
                pessoa: true,
                usuario: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return entregas;
    }
    async changeStatus(id) {
        const entrega = await this.prisma.entrega.findUnique({
            where: { id },
        });
        if (!entrega) {
            return { error: 'Entrega não existe' };
        }
        const changeUser = await this.prisma.entrega.update({
            where: {
                id,
            },
            data: {
                status: entrega.status == 'ativo' ? 'inativo' : 'ativo',
            },
        });
        return changeUser;
    }
};
exports.EntregraService = EntregraService;
exports.EntregraService = EntregraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EntregraService);
//# sourceMappingURL=entregra.service.js.map