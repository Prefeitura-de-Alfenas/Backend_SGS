import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipamentoService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipamentoDTO: Prisma.EquipamentoCreateInput) {
    try {
      const equipamento = await this.prisma.equipamento.create({
        data: createEquipamentoDTO,
      });
      return equipamento;
    } catch (error) {
      return { error: error.message };
    }
  }

  async update(
    id: string,
    updateEquipamentoDTO: Prisma.EquipamentoUpdateInput,
  ) {
    try {
      const equipamento = await this.prisma.equipamento.update({
        where: { id: id },
        data: updateEquipamentoDTO,
      });
      return equipamento;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(take: string, skip: string, filter: string) {
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
    } catch (error) {
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

      return equipamentos;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findById(id: string) {
    try {
      const equipamento = await this.prisma.equipamento.findUnique({
        where: { id },
      });
      return equipamento;
    } catch (error) {
      return { error: error.message };
    }
  }
}
