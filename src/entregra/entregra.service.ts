import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntregaDto } from './DTO/EntregaCreate';
import { addDays, format } from 'date-fns';
import { BuscaEntrega } from './DTO/BuscaEntrega';

@Injectable()
export class EntregraService {
  constructor(private prisma: PrismaService) {}
  async create(createEntregaDTO: CreateEntregaDto) {
    try {
      //Verificar se o EquipamentoId do usuario == a o equipamentoId da pessoa
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
      // if (usuario.equipamentoId !== pessoa.equipamentoId) {
      //   return {
      //     error:
      //       'Este usuario não pode gerar o beneficio para essa familia, essa familia ou usuario e atendido em outro equipamento',
      //   };
      // }

      //verificar se a data de criação ja faz 30 dias
      //buscar pessoa e o beneficio que essa pessoa tem com id do beneficio id e verficar se tem data menor que 30 dias
      // const beneficioModelador = await this.prisma.entrega.findMany({
      //   where: {
      //     pessoId: createEntregaDTO.pessoId,
      //     beneficioId: createEntregaDTO.beneficioId,
      //     datacadastro: {
      //       gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // Subtrai 30 dias da data atual
      //     },
      //     status: 'ativo',
      //   },
      // });
 
      // if (beneficioModelador.length !== 0) {
      //   return {
      //     error: 'Esse beneficio já foi entregue esse mês para essa familia',
      //   };
      // }
      // eslint-disable-next-line prettier/prettier


      const entrega = await this.prisma.entrega.create({
        data: createEntregaDTO,
      });
      return entrega;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAllForPessoas(
    id: string,
    take: string,
    skip: string,
    filter: string,
  ) {
    try {
      const takeNumber = parseInt(take);
      const skipNumber = parseInt(skip);
      const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;

      const entrega = await this.prisma.entrega.findMany({
        where: {
          pessoId: id,
          status: {
            in: ['ativo', 'pendente'],
          },
        },

        include: {
          pessoa: true,
          beneficio: true,
        },
        take: takeNumber,
        skip: page,
      });
      return entrega;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(take: string, skip: string, filter: string) {
    try {
      const takeNumber = parseInt(take);
      const skipNumber = parseInt(skip);
      const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;

      const entrega = await this.prisma.entrega.findMany({
        where: {
          status: {
            in: ['ativo', 'pendente'],
          },
        },

        include: {
          pessoa: true,
          beneficio: true,
        },
        take: takeNumber,
        skip: page,
      });
      return entrega;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findById(id: string) {
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
      if (!entrega) {
        return { error: 'Entrega não encontrada.' };
      }
      // Busca a última entrega da mesma pessoa com benefício "cesta basica"
      const ultimaEntregaCestaBasica = await this.prisma.entrega.findFirst({
        where: {
          pessoId: entrega.pessoId,
          beneficio: {
            nome: 'Cesta Básica',
          },
          status: 'ativo',
          id: {
            not: entrega.id, // exclui a própria entrega do resultado
          },
        },
        orderBy: {
          datacadastro: 'desc',
        },
      });
      return {
        entrega,
        ultimaEntregaCestaBasica,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAllRelatorioPorData({
    dateinicial,
    datefinal,
    pessoId,
    usuarioId,
    equipamentoId,
    beneficioId,
    statusid,
  }: BuscaEntrega) {
    const formattedDateInicial = format(
      new Date(dateinicial),
      'yyyy-MM-dd HH:mm:ss',
    );
    const formattedDateFinal = format(
      new Date(datefinal),
      'yyyy-MM-dd HH:mm:ss',
    );
    const nextDayDateFinal = addDays(formattedDateFinal, 1);

    const whereClause: {
      pessoId?: string;
      equipamentoId?: string;
      usuarioId?: string;
      beneficioId?: string;
      status: any;
      datacadastro: {
        gte: Date;
        lte: Date;
      };
    } = {
      status: 'ativo',
      datacadastro: {
        gte: new Date(formattedDateInicial), // 'gte' significa "maior ou igual a"
        lte: new Date(nextDayDateFinal), // 'lte' significa "menor ou igual a"
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

  async changeStatus(id: string) {
    const entrega = await this.prisma.entrega.findUnique({
      where: { id },
    });
    if (!entrega) {
      return { error: 'Entrega não existe' };
    }
    if (entrega.status == 'pendente') {
      const changeUser = await this.prisma.entrega.update({
        where: {
          id,
        },
        data: {
          status: 'ativo',
        },
      });
      return changeUser;
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
}
