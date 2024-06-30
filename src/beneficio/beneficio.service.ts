import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BeneficioService {
  constructor(private prisma: PrismaService) {}

  async AddBeneficioPessoa(id: string, pessoaid: string) {
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

    const result = pessoa.beneficios.find(
      (beneficio) => beneficio.beneficioId === id.toString(),
    );

    if (result) {
      await this.prisma.pessoasOnBeneficios.delete({
        where: {
          pessoaId_beneficioId: {
            pessoaId: pessoa.id,
            beneficioId: id.toString(),
          },
        },
      });
    } else {
      await this.prisma.pessoasOnBeneficios.create({
        data: {
          pessoaId: pessoa.id,
          beneficioId: id.toString(),
        },
      });
    }
    return pessoa;
  }

  async create(createBeneficioDTO: Prisma.BeneficioCreateInput) {
    try {
      const beneficio = await this.prisma.beneficio.create({
        data: createBeneficioDTO,
      });

      return beneficio;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findById(id: string) {
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
    } catch (error) {
      return error.message;
    }
  }

  async findAll(take: string, skip: string, filter: string) {
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
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(id: string, updateBeneficioDTO: Prisma.BeneficioUpdateInput) {
    try {
      const beneficio = await this.prisma.beneficio.update({
        where: { id: id },
        data: updateBeneficioDTO,
      });
      return beneficio;
    } catch (error) {
      return { error: error.message };
    }
  }
}
