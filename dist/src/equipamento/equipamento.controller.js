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
exports.EquipamentoController = void 0;
const common_1 = require("@nestjs/common");
const equipamento_service_1 = require("./equipamento.service");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let EquipamentoController = class EquipamentoController {
    constructor(equipamentoService) {
        this.equipamentoService = equipamentoService;
    }
    async Create(createEquipamentoDTO) {
        return this.equipamentoService.create(createEquipamentoDTO);
    }
    async Update(id, updateEquipamentoDTO) {
        return this.equipamentoService.update(id, updateEquipamentoDTO);
    }
    async GetAll(take, skip, filter) {
        return this.equipamentoService.findAll(take, skip, filter);
    }
    async GetById(id) {
        return this.equipamentoService.findById(id);
    }
    async GetAllFilter() {
        return this.equipamentoService.findAllNoFilter();
    }
};
exports.EquipamentoController = EquipamentoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipamentoController.prototype, "Create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EquipamentoController.prototype, "Update", null);
__decorate([
    (0, common_1.Get)('findall/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('take')),
    __param(1, (0, common_1.Param)('skip')),
    __param(2, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], EquipamentoController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipamentoController.prototype, "GetById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipamentoController.prototype, "GetAllFilter", null);
exports.EquipamentoController = EquipamentoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('equipamento'),
    __metadata("design:paramtypes", [equipamento_service_1.EquipamentoService])
], EquipamentoController);
//# sourceMappingURL=equipamento.controller.js.map