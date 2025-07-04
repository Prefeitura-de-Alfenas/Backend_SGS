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
exports.PessoaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const date_fns_1 = require("date-fns");
let PessoaService = class PessoaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importDataFromCsv() {
        const results = [];
        const filePath = path.join(__dirname, '..', '..', '..', 'mnt', 'data', 'DadosCAD.csv');
        fs.createReadStream(filePath, { encoding: 'utf8' })
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
            for (const row of results) {
                try {
                    await this.prisma.pessoa.create({
                        data: {
                            id: row.id,
                            nome: row.nome,
                            cpf: row.cpf,
                            sexo: row.sexo == 'F' ? 'feminino' : 'masculino',
                            telefone: row.tel_cel,
                            datanascimento: row.dataNasc
                                ? (0, date_fns_1.parse)(row.dataNasc, 'dd/MM/yyyy', new Date())
                                : new Date(),
                            rg: row.rg,
                            escolaridade: row.escolaridade ? row.escolaridade : '',
                            whastapp: row.whastapp == 'N�O' ? 0 : 1,
                            estadocivil: row.estadoCivil ? row.estadoCivil : 'solteiro',
                            renda: parseFloat(row.renda),
                            ctpsassinada: row.ctps_assinada == 'N�O' ? 0 : 1,
                            ppcl: 0,
                            gestante: row.gestante ? parseInt(row.gestante) : 0,
                            observacao: row.obs,
                            observacaorestrita: row.obs,
                            cep: '37133-782',
                            logradouro: row.endereco,
                            complemento: '',
                            bairro: row.bairro,
                            localidade: 'Alfenas',
                            numero: row.numero,
                            uf: 'MG',
                            status: row.status == '0' ? 'ativo' : 'inativo',
                            equipamentoId: 'e2c023c0-913b-4cf5-8f68-a05d956904f3',
                        },
                    });
                }
                catch (error) {
                    console.error(`Error inserting ${row.nome}: `, error);
                }
            }
        });
    }
    async findbyidEntrega(id) {
        try {
            const pessoa = await this.prisma.pessoa.findUnique({
                where: {
                    id,
                },
                include: {
                    equipamento: true,
                    beneficios: {
                        include: {
                            beneficio: true,
                        },
                    },
                },
            });
            if (!pessoa) {
                return { error: 'Pessoa não existe no sistema' };
            }
            return pessoa;
        }
        catch (error) {
            return error.message;
        }
    }
    async changeResponsavelFamiliar(idFamilar) {
        try {
            const familar = await this.prisma.pessoa.findUnique({
                where: {
                    id: idFamilar,
                    pessoaId: {
                        not: null,
                    },
                },
            });
            if (!familar) {
                return {
                    error: 'Pessoa já é responsavel ou não existe na base de dados',
                };
            }
            await this.prisma.$transaction([
                this.prisma.pessoa.updateMany({
                    where: {
                        OR: [
                            { id: familar.pessoaId },
                            { pessoaId: familar.pessoaId },
                        ],
                        NOT: {
                            id: familar.id,
                        },
                    },
                    data: {
                        pessoaId: familar.id,
                    },
                }),
                this.prisma.pessoa.update({
                    where: {
                        id: familar.id,
                    },
                    data: {
                        pessoaId: null,
                    },
                }),
            ]);
            return { menssage: 'Atualizado com sucesso' };
        }
        catch (error) {
            if (error.message.includes('pessoa_cpf_key')) {
                return { error: 'CPF já existe na base de dados' };
            }
            return { error: error.message };
        }
        finally {
            await this.prisma.$disconnect();
        }
    }
    async create(createPessoaDto) {
        try {
            const pessoa = await this.prisma.pessoa.create({
                data: createPessoaDto,
            });
            return pessoa;
        }
        catch (error) {
            if (error.message.includes('pessoa_cpf_key')) {
                return { error: 'CPF já existe na base de dados' };
            }
            return { error: error.message };
        }
    }
    async update(id, updatePessoaDto) {
        try {
            const pessoa = await this.prisma.pessoa.update({
                where: {
                    id,
                },
                data: updatePessoaDto,
            });
            return pessoa;
        }
        catch (error) {
            if (error.message.includes('pessoa_cpf_key')) {
                return { error: 'CPF já existe na base de dados' };
            }
            return { error: error.message };
        }
    }
    async findAll(take, skip, filter) {
        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
        const pessoas = await this.prisma.pessoa.findMany({
            where: {
                pessoaId: null,
                cpf: {
                    contains: filter,
                },
                status: 'ativo',
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: takeNumber,
            skip: page,
        });
        return pessoas;
    }
    async findAllRelatorioPorData(dateinicial, datefinal, filter) {
        const formattedDateInicial = (0, date_fns_1.format)(new Date(dateinicial), 'yyyy-MM-dd HH:mm:ss');
        const formattedDateFinal = (0, date_fns_1.format)(new Date(datefinal), 'yyyy-MM-dd HH:mm:ss');
        const nextDayDateFinal = (0, date_fns_1.addDays)(formattedDateFinal, 1);
        const pessoas = await this.prisma.pessoa.findMany({
            where: {
                nome: {
                    contains: filter,
                },
                status: 'ativo',
                createdAt: {
                    gte: new Date(formattedDateInicial),
                    lte: new Date(nextDayDateFinal),
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return pessoas;
    }
    async findById(id) {
        try {
            const pessoa = await this.prisma.pessoa.findUnique({
                where: {
                    id,
                },
                include: {
                    equipamento: true,
                    beneficios: true,
                },
            });
            if (!pessoa) {
                return { error: 'Pessoa não existe no sistema' };
            }
            return pessoa;
        }
        catch (error) {
            return error.message;
        }
    }
    async findFamiliiaresByid(id) {
        try {
            const pessoa = await this.prisma.pessoa.findUnique({
                where: {
                    id,
                },
                include: {
                    equipamento: true,
                    beneficios: true,
                    familiares: true,
                    entregas: {
                        include: {
                            beneficio: {
                                select: {
                                    nome: true,
                                },
                            },
                            equipamento: {
                                select: {
                                    nome: true,
                                },
                            },
                            usuario: {
                                select: {
                                    nome: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!pessoa) {
                return { error: 'Pessoa não existe no sistema' };
            }
            return pessoa;
        }
        catch (error) {
            return error.message;
        }
    }
    async findAllFamiliares(id, take, skip, filter) {
        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
        const familiares = await this.prisma.pessoa.findMany({
            where: {
                pessoaId: id,
                cpf: {
                    contains: filter,
                },
                status: 'ativo',
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: takeNumber,
            skip: page,
        });
        return familiares;
    }
    async changeStatus(id) {
        const pessoa = await this.prisma.pessoa.findUnique({
            where: { id },
        });
        if (!pessoa) {
            return { error: 'Pessoa não existe' };
        }
        const changeStatusPessoa = await this.prisma.pessoa.update({
            where: {
                id,
                pessoaId: null,
            },
            data: {
                status: pessoa.status == 'ativo' ? 'inativo' : 'ativo',
            },
        });
        return changeStatusPessoa;
    }
    async findAllInativePessoas(take, skip, filter) {
        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
        const pessoas = await this.prisma.pessoa.findMany({
            where: {
                pessoaId: null,
                cpf: {
                    contains: filter,
                },
                status: 'inativo',
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: takeNumber,
            skip: page,
        });
        return pessoas;
    }
};
exports.PessoaService = PessoaService;
exports.PessoaService = PessoaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PessoaService);
//# sourceMappingURL=pessoa.service.js.map