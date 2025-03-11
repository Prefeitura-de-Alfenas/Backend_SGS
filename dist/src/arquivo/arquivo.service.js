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
const fs = require("fs/promises");
const fssync = require("fs");
const path = require("path");
let ArquivoService = class ArquivoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllForPessoas(id, take, skip, filter) {
        try {
            const takeNumber = parseInt(take);
            const skipNumber = parseInt(skip);
            const page = skipNumber == 0 ? skipNumber : skipNumber * takeNumber;
            const entrega = await this.prisma.arquivo.findMany({
                where: {
                    pessoId: id,
                },
                include: {
                    pessoa: true,
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
    async uploadFile(file, data) {
        try {
            if (!file) {
                throw new common_1.HttpException('Nenhum arquivo foi enviado', common_1.HttpStatus.BAD_REQUEST);
            }
            const dataResponse = {
                ...data,
                url: file.filename,
            };
            const response = await this.prisma.arquivo.create({
                data: dataResponse,
            });
            return response;
        }
        catch (error) {
            if (file) {
                this.deleteArquivo(file);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getFile(id) {
        const arquivo = await this.prisma.arquivo.findUnique({
            where: { id },
        });
        return arquivo;
    }
    async deleteFile(id) {
        const arquivo = await this.prisma.arquivo.findUnique({
            where: {
                id,
            },
        });
        console.log(arquivo);
        if (!arquivo) {
            return { error: 'Arquivo não encontrado' };
        }
        const uploadsDir = path.resolve(process.cwd(), 'uploads');
        const filePath = path.join(uploadsDir, arquivo.url);
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
            await this.prisma.arquivo.delete({
                where: {
                    id: arquivo.id,
                },
            });
            return { success: 'Arquivo excluído com sucesso' };
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return { error: 'Arquivo não encontrado' };
            }
            else {
                console.error(error);
                return { error: 'Erro ao excluir o arquivo' };
            }
        }
    }
    deleteArquivo(file) {
        const uploadsDir = path.resolve(process.cwd(), 'uploads');
        console.log(uploadsDir);
        const filePath = path.join(uploadsDir, file.filename);
        console.log(uploadsDir);
        if (fssync.existsSync(filePath)) {
            fssync.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Arquivo excluído com sucesso');
                }
            });
        }
        else {
            console.log('Arquivo não encontrado');
        }
    }
};
exports.ArquivoService = ArquivoService;
exports.ArquivoService = ArquivoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArquivoService);
//# sourceMappingURL=arquivo.service.js.map