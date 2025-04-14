import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArquivo } from './DTO/createArquivo';
import * as Minio from 'minio';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { File } from 'multer';

@Injectable()
export class ArquivoService {
  private readonly minioClient: Minio.Client;
  private readonly bucketName = 'sgs'; // nome do bucket no MinIO

  constructor(private prisma: PrismaService) {
    this.minioClient = new Minio.Client({
      endPoint: 's3.alfenas.mg.gov.br',
      useSSL: true,
      accessKey: process.env.ACCESS_KEY_MINIO,
      secretKey: process.env.SECRET_KEY_MINIO,
    });
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
      const page = skipNumber === 0 ? 0 : skipNumber * takeNumber;

      const entrega = await this.prisma.arquivo.findMany({
        where: { pessoId: id },
        include: { pessoa: true },
        take: takeNumber,
        skip: page,
      });
      return entrega;
    } catch (error) {
      return { error: error.message };
    }
  }
  async uploadFile(file: File, data: CreateArquivo) {
    if (!file) {
      throw new HttpException(
        'Nenhum arquivo foi enviado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileName = `${randomUUID()}${path.extname(file.originalname)}`;

    try {
      // Garante que o bucket existe
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
      }

      // Faz upload do arquivo para o bucket
      await this.minioClient.putObject(
        this.bucketName,
        fileName,
        file.buffer,
        file.buffer.length,
        {
          'Content-Type': file.mimetype,
        },
      );

      const dataResponse = {
        ...data,
        url: fileName, // armazena apenas o nome do arquivo
      };

      return await this.prisma.arquivo.create({ data: dataResponse });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao enviar arquivo para o MinIO',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFile(id: string) {
    const arquivo = await this.prisma.arquivo.findUnique({ where: { id } });
    console.log('arquivo#', arquivo);
    await this.minioClient.statObject(this.bucketName, arquivo.url.trim());

    // Gera a URL assinada
    const url = await this.minioClient.presignedGetObject(
      this.bucketName,
      arquivo.url,
      3600,
    ); // URL válida por 1 hora
    arquivo.url = url;

    return arquivo;
  }

  async deleteFile(id: string) {
    const arquivo = await this.prisma.arquivo.findUnique({
      where: { id },
    });

    if (!arquivo) {
      return { error: 'Arquivo não encontrado' };
    }

    try {
      await this.minioClient.removeObject(this.bucketName, arquivo.url);
      await this.prisma.arquivo.delete({ where: { id: arquivo.id } });

      return { success: 'Arquivo excluído com sucesso' };
    } catch (error) {
      console.error(error);
      return { error: 'Erro ao excluir o arquivo do MinIO' };
    }
  }
}
