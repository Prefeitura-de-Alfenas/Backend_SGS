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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let PessoaService = class PessoaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    slugify(nome) {
        const base = nome
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 20);
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${base}-${random}`;
    }
    async generateUniqueSlug(nome) {
        let slug;
        let exists = true;
        do {
            slug = this.slugify(nome);
            const existing = await prisma.pessoa.findUnique({ where: { slug } });
            exists = !!existing;
        } while (exists);
        return slug;
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
            const hasResponsavel = createPessoaDto.pessoaId !== null &&
                createPessoaDto.pessoaId !== undefined;
            if (hasResponsavel) {
                const responsavel = await this.prisma.pessoa.findUnique({
                    where: {
                        id: createPessoaDto.pessoaId,
                    },
                });
                if (responsavel?.status === 'inativo') {
                    return { error: 'Responsável desativado' };
                }
            }
            const { pessoaDeficiencia, pessoaFonteRenda, nome, ...resto } = createPessoaDto;
            let slug = undefined;
            if (!hasResponsavel) {
                slug = await this.generateUniqueSlug(nome);
            }
            const pessoa = await this.prisma.pessoa.create({
                data: {
                    nome: nome.toUpperCase(),
                    slug,
                    ...resto,
                    pessoaDeficiencia: {
                        create: pessoaDeficiencia?.map((deficienciaId) => ({
                            deficiencia: { connect: { id: deficienciaId } },
                        })) || [],
                    },
                    pessoaFonteRenda: {
                        create: pessoaFonteRenda?.map((fonteRendaId) => ({
                            fonteRenda: { connect: { id: fonteRendaId } },
                        })) || [],
                    },
                },
                include: {
                    pessoaDeficiencia: true,
                    pessoaFonteRenda: true,
                },
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
            const { pessoaDeficiencia, pessoaFonteRenda, ...dadosPessoa } = updatePessoaDto;
            const { nome, ...resto } = dadosPessoa;
            const pessoaIsAtivo = await this.prisma.pessoa.findFirst({
                where: {
                    id,
                },
            });
            if (!pessoaIsAtivo) {
                return { error: 'Pessoa não existe' };
            }
            if (pessoaIsAtivo.status === 'inativo') {
                return { error: 'Pessoa Inativa' };
            }
            const pessoa = await this.prisma.pessoa.update({
                where: { id },
                data: {
                    nome: nome.toUpperCase(),
                    ...resto,
                },
            });
            await this.prisma.pessoaDeficiencia.deleteMany({
                where: { pessoaId: id },
            });
            await this.prisma.pessoaFonteRenda.deleteMany({
                where: { pessoaId: id },
            });
            if (Array.isArray(pessoaDeficiencia) && pessoaDeficiencia.length > 0) {
                await this.prisma.pessoaDeficiencia.createMany({
                    data: pessoaDeficiencia.map((deficienciaId) => ({
                        pessoaId: id,
                        deficienciaId,
                    })),
                });
            }
            if (Array.isArray(pessoaFonteRenda) && pessoaFonteRenda.length > 0) {
                await this.prisma.pessoaFonteRenda.createMany({
                    data: pessoaFonteRenda.map((fonteRendaId) => ({
                        pessoaId: id,
                        fonteRendaId,
                    })),
                });
            }
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
        const whereFilter = filter && filter.trim() !== ''
            ? {
                OR: [
                    { nome: { contains: filter } },
                    { cpf: { contains: filter } },
                    { slug: { contains: filter } },
                ],
            }
            : {};
        const pessoas = await this.prisma.pessoa.findMany({
            where: {
                pessoaId: null,
                ...whereFilter,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: takeNumber,
            skip: page,
            include: {
                usuario: true,
            },
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
                    pessoaDeficiencia: true,
                    pessoaFonteRenda: true,
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
            const normalizar = (valor) => valor.replace(/\D/g, '');
            const cepSemMascara = normalizar(pessoa.cep);
            const numeroSemMascara = normalizar(pessoa.numero);
            const pessoasSemFiltro = await this.prisma.pessoa.findMany({
                where: {
                    pessoaId: null,
                },
            });
            const enderecos = pessoasSemFiltro.filter((pessoaFilter) => {
                const cepBase = normalizar(pessoaFilter.cep);
                const numeroBase = normalizar(pessoaFilter.numero);
                return (cepBase === cepSemMascara &&
                    numeroBase === numeroSemMascara &&
                    pessoaFilter.id !== pessoa.id);
            });
            return {
                dados: {
                    pessoa,
                    enderecos,
                },
            };
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
    async changeStatus(data) {
        const { id, motivo, usuarioId } = data;
        return await this.prisma.$transaction(async (tx) => {
            const pessoa = await tx.pessoa.findUnique({
                where: { id },
                include: {
                    responsavel: true,
                    familiares: true,
                },
            });
            if (!pessoa) {
                return {
                    error: 'Pessoa não existe',
                };
            }
            if (pessoa.pessoaId === null && pessoa.familiares.length > 0) {
                return {
                    error: 'Pessoa que tem familiares e não pode ter o status alterado',
                };
            }
            const updated = await tx.pessoa.update({
                where: { id },
                data: {
                    status: pessoa.status === 'ativo' ? 'inativo' : 'ativo',
                    pessoaId: null,
                    motivoexclusao: motivo ? motivo : '',
                    usuarioId: usuarioId ? usuarioId : '',
                },
            });
            return updated;
        });
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
    async moverPessoaParaOutroResponsavel(data) {
        try {
            const { pessoaId, novoResponsavelId } = data;
            return await this.prisma.$transaction(async (tx) => {
                if (pessoaId === novoResponsavelId) {
                    return {
                        error: 'A pessoa e o Responsavel não pode ser o mesmo',
                    };
                }
                const pessoa = await tx.pessoa.findUnique({
                    where: { id: pessoaId },
                    include: {
                        familiares: true,
                    },
                });
                if (!pessoa) {
                    return {
                        error: 'Pessoa não encontrada',
                    };
                }
                if (pessoa.status === 'inativo') {
                    return {
                        error: 'Pessoa foi inativada',
                    };
                }
                if (pessoa.familiares.length > 0) {
                    return {
                        error: 'Pessoa não pode ser movida pois é responsável com familiares',
                    };
                }
                const novoResponsavel = await tx.pessoa.findUnique({
                    where: { id: novoResponsavelId },
                    select: {
                        pessoaId: true,
                        cep: true,
                        logradouro: true,
                        complemento: true,
                        bairro: true,
                        localidade: true,
                        numero: true,
                        uf: true,
                        status: true,
                    },
                });
                if (!novoResponsavel) {
                    return {
                        error: 'Novo responsável não encontrado',
                    };
                }
                if (novoResponsavel.pessoaId !== null) {
                    return {
                        error: 'Novo responsável não é um responsável principal',
                    };
                }
                if (novoResponsavel.status === 'inativo') {
                    return {
                        error: 'Responsavel foi inativada',
                    };
                }
                const pessoaAtualizada = await tx.pessoa.update({
                    where: { id: pessoaId },
                    data: {
                        pessoaId: novoResponsavelId,
                        cep: novoResponsavel.cep,
                        logradouro: novoResponsavel.logradouro,
                        complemento: novoResponsavel.complemento,
                        bairro: novoResponsavel.bairro,
                        localidade: novoResponsavel.localidade,
                        numero: novoResponsavel.numero,
                        uf: novoResponsavel.uf,
                    },
                });
                return {
                    message: 'Pessoa movida com sucesso e endereço atualizado',
                    pessoaAtualizada,
                };
            });
        }
        catch (error) {
            return {
                error: `Erro ao mover pessoa: ${error.message || 'erro desconhecido'}`,
            };
        }
    }
    async buscarPessoaPorCpf(cpf) {
        const pessoa = await this.prisma.pessoa.findUnique({
            where: { cpf },
            select: {
                id: true,
                nome: true,
                pessoaId: true,
            },
        });
        if (!pessoa) {
            return { error: 'Pessoa não existe' };
        }
        return pessoa;
    }
    async buscaEnderecoRepetido(cep, numero) {
        const normalizar = (valor) => valor.replace(/\D/g, '');
        const cepSemMascara = normalizar(cep);
        const numeroSemMascara = normalizar(numero);
        const pessoasSemFiltro = await this.prisma.pessoa.findMany({
            where: {
                pessoaId: null,
            },
        });
        const pessoas = pessoasSemFiltro.filter((pessoa) => {
            const cepBase = normalizar(pessoa.cep);
            const numeroBase = normalizar(pessoa.numero);
            return cepBase === cepSemMascara && numeroBase === numeroSemMascara;
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