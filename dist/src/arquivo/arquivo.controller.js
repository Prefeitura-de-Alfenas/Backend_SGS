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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArquivoController = void 0;
const common_1 = require("@nestjs/common");
const arquivo_service_1 = require("./arquivo.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const crypto_1 = require("crypto");
const createArquivo_1 = require("./DTO/createArquivo");
let ArquivoController = class ArquivoController {
    constructor(arquivoService) {
        this.arquivoService = arquivoService;
    }
    async GetAllForPessoas(id, take, skip, filter) {
        return this.arquivoService.findAllForPessoas(id, take, skip, filter);
    }
    async uploadFile(file, data) {
        return this.arquivoService.uploadFile(file, data);
    }
    async getFile(res, id) {
        const arquivo = await this.arquivoService.getFile(id);
        if (!arquivo) {
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: 'Erro ao buscar esse arquivo' });
        }
        const uploadsDir = path.resolve(process.cwd(), 'uploads');
        const filePath = path.join(uploadsDir, arquivo.url);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res
                    .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .send({ error: 'Erro ao buscar esse arquivo' });
            }
        });
    }
    deleteFile(id) {
        return this.arquivoService.deleteFile(id);
    }
};
exports.ArquivoController = ArquivoController;
__decorate([
    (0, common_1.Get)('findallforpessoas/:id/take/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('take')),
    __param(2, (0, common_1.Param)('skip')),
    __param(3, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ArquivoController.prototype, "GetAllForPessoas", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = (0, crypto_1.randomUUID)();
                return cb(null, `${randomName}${path.extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Tipo de arquivo não suportado'), false);
            }
        },
        limits: {
            fileSize: 3 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createArquivo_1.CreateArquivo]),
    __metadata("design:returntype", Promise)
], ArquivoController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/file/getfile/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ArquivoController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/file/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArquivoController.prototype, "deleteFile", null);
exports.ArquivoController = ArquivoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('arquivo'),
    __metadata("design:paramtypes", [arquivo_service_1.ArquivoService])
], ArquivoController);
//# sourceMappingURL=arquivo.controller.js.map