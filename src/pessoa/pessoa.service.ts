import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs'; // Use importação correta para fs
import * as csv from 'csv-parser'; // Use importação correta para csv-parser
import * as path from 'path';
import { addDays, format, parse } from 'date-fns'; // Importe a função parse do date-fns
@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}
  async importDataFromCsv(): Promise<void> {
    const results: any[] = [];
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'mnt',
      'data',
      'DadosCAD.csv',
    );
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
                  ? parse(row.dataNasc, 'dd/MM/yyyy', new Date())
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
          } catch (error) {
            console.error(`Error inserting ${row.nome}: `, error);
          }
        }
      });
  }
  async findbyidEntrega(id: string) {
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
    } catch (error) {
      return error.message;
    }
  }

  async changeResponsavelFamiliar(idFamilar: string) {
    try {
      //Primeiro pegar o familiar

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
      //pegar todos as pessoas com esse iddo responsavel

      await this.prisma.$transaction([
        this.prisma.pessoa.updateMany({
          where: {
            OR: [
              { id: familar.pessoaId },
              // Adicione qualquer outra condição OR, se necessário
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
    } catch (error) {
      if (error.message.includes('pessoa_cpf_key')) {
        return { error: 'CPF já existe na base de dados' };
      }
      return { error: error.message };
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async create(createPessoaDto: any) {
    try {
      // Extrai os arrays de IDs das relações M:N
      const { pessoaDeficiencia, pessoaFonteRenda, ...dadosPessoa } =
        createPessoaDto;

      const pessoa = await this.prisma.pessoa.create({
        data: {
          ...dadosPessoa,

          // Cria os relacionamentos com deficiência
          pessoaDeficiencia: {
            create:
              pessoaDeficiencia?.map((deficienciaId: string) => ({
                deficiencia: { connect: { id: deficienciaId } },
              })) || [],
          },

          // Cria os relacionamentos com fonte de renda
          pessoaFonteRenda: {
            create:
              pessoaFonteRenda?.map((fonteRendaId: string) => ({
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
    } catch (error) {
      if (error.message.includes('pessoa_cpf_key')) {
        return { error: 'CPF já existe na base de dados' };
      }

      return { error: error.message };
    }
  }

  async update(id: string, updatePessoaDto: any) {
    try {
      // Extrai os relacionamentos do DTO
      const { pessoaDeficiencia, pessoaFonteRenda, ...dadosPessoa } =
        updatePessoaDto;

      // 1. Atualiza os dados principais da Pessoa
      const pessoa = await this.prisma.pessoa.update({
        where: { id },
        data: {
          ...dadosPessoa,
        },
      });

      // 2. Remove os relacionamentos antigos
      await this.prisma.pessoaDeficiencia.deleteMany({
        where: { pessoaId: id },
      });
      await this.prisma.pessoaFonteRenda.deleteMany({
        where: { pessoaId: id },
      });

      // 3. Cria os novos relacionamentos (se houver)
      if (Array.isArray(pessoaDeficiencia) && pessoaDeficiencia.length > 0) {
        await this.prisma.pessoaDeficiencia.createMany({
          data: pessoaDeficiencia.map((deficienciaId: string) => ({
            pessoaId: id,
            deficienciaId,
          })),
        });
      }

      if (Array.isArray(pessoaFonteRenda) && pessoaFonteRenda.length > 0) {
        await this.prisma.pessoaFonteRenda.createMany({
          data: pessoaFonteRenda.map((fonteRendaId: string) => ({
            pessoaId: id,
            fonteRendaId,
          })),
        });
      }

      return pessoa;
    } catch (error) {
      if (error.message.includes('pessoa_cpf_key')) {
        return { error: 'CPF já existe na base de dados' };
      }
      return { error: error.message };
    }
  }

  async findAll(take: string, skip: string, filter: string) {
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

  async findAllRelatorioPorData(
    dateinicial: string,
    datefinal: string,
    filter: string,
  ) {
    const formattedDateInicial = format(
      new Date(dateinicial),
      'yyyy-MM-dd HH:mm:ss',
    );
    const formattedDateFinal = format(
      new Date(datefinal),
      'yyyy-MM-dd HH:mm:ss',
    );
    const nextDayDateFinal = addDays(formattedDateFinal, 1);
    const pessoas = await this.prisma.pessoa.findMany({
      where: {
        nome: {
          contains: filter,
        },
        status: 'ativo',
        createdAt: {
          gte: new Date(formattedDateInicial), // 'gte' significa "maior ou igual a"
          lte: new Date(nextDayDateFinal), // 'lte' significa "menor ou igual a"
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return pessoas;
  }

  async findById(id: string) {
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
    } catch (error) {
      return error.message;
    }
  }
  async findFamiliiaresByid(id: string) {
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
    } catch (error) {
      return error.message;
    }
  }

  async findAllFamiliares(
    id: string,
    take: string,
    skip: string,
    filter: string,
  ) {
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

  async changeStatus(id: string) {
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

  async findAllInativePessoas(take: string, skip: string, filter: string) {
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
}
