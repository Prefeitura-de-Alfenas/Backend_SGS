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
exports.ArquivoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const Minio = require("minio");
const crypto_1 = require("crypto");
const path = require("path");
let ArquivoService = class ArquivoService {
    constructor(prisma) {
        this.prisma = prisma;
        this.bucketName = 'sgs';
        this.minioClient = new Minio.Client({
            endPoint: 's3.alfenas.mg.gov.br',
            useSSL: true,
            accessKey: process.env.ACCESS_KEY_MINIO,
            secretKey: process.env.SECRET_KEY_MINIO,
        });
    }
    async findAllForPessoas(id, take, skip, filter) {
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
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async uploadFile(file, data) {
        if (!file) {
            throw new common_1.HttpException('Nenhum arquivo foi enviado', common_1.HttpStatus.BAD_REQUEST);
        }
        const fileName = `${(0, crypto_1.randomUUID)()}${path.extname(file.originalname)}`;
        try {
            const exists = await this.minioClient.bucketExists(this.bucketName);
            if (!exists) {
                await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
            }
            await this.minioClient.putObject(this.bucketName, fileName, file.buffer, file.buffer.length, {
                'Content-Type': file.mimetype,
            });
            const dataResponse = {
                ...data,
                url: fileName,
            };
            return await this.prisma.arquivo.create({ data: dataResponse });
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Erro ao enviar arquivo para o MinIO', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getFile(id) {
        const arquivo = await this.prisma.arquivo.findUnique({ where: { id } });
        await this.minioClient.statObject(this.bucketName, arquivo.url.trim());
        const url = await this.minioClient.presignedGetObject(this.bucketName, arquivo.url, 3600);
        arquivo.url = url;
        return arquivo;
    }
    async deleteFile(id) {
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
        }
        catch (error) {
            console.error(error);
            return { error: 'Erro ao excluir o arquivo do MinIO' };
        }
    }
};
exports.ArquivoService = ArquivoService;
exports.ArquivoService = ArquivoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArquivoService);
//# sourceMappingURL=arquivo.service.js.map