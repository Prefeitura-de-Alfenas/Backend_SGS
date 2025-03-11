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
exports.EntregraController = void 0;
const common_1 = require("@nestjs/common");
const entregra_service_1 = require("./entregra.service");
const EntregaCreate_1 = require("./DTO/EntregaCreate");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const BuscaEntrega_1 = require("./DTO/BuscaEntrega");
let EntregraController = class EntregraController {
    constructor(entregraService) {
        this.entregraService = entregraService;
    }
    async Create(createEtnregaDTO) {
        return this.entregraService.create(createEtnregaDTO);
    }
    async GetAll(take, skip, filter) {
        return this.entregraService.findAll(take, skip, filter);
    }
    async GetById(id) {
        return this.entregraService.findById(id);
    }
    async GetAllForPessoas(id, take, skip, filter) {
        return this.entregraService.findAllForPessoas(id, take, skip, filter);
    }
    async findallForRelatorioPorData(getBuscaDto) {
        return this.entregraService.findAllRelatorioPorData(getBuscaDto);
    }
    async update(id) {
        return this.entregraService.changeStatus(id);
    }
};
exports.EntregraController = EntregraController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntregaCreate_1.CreateEntregaDto]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "Create", null);
__decorate([
    (0, common_1.Get)('findall/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('take')),
    __param(1, (0, common_1.Param)('skip')),
    __param(2, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "GetById", null);
__decorate([
    (0, common_1.Get)('findallforpessoas/:id/take/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('take')),
    __param(2, (0, common_1.Param)('skip')),
    __param(3, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "GetAllForPessoas", null);
__decorate([
    (0, common_1.Post)('entregarelatoriodate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BuscaEntrega_1.BuscaEntrega]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "findallForRelatorioPorData", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntregraController.prototype, "update", null);
exports.EntregraController = EntregraController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('entregra'),
    __metadata("design:paramtypes", [entregra_service_1.EntregraService])
], EntregraController);
//# sourceMappingURL=entregra.controller.js.map