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
exports.PessoaController = void 0;
const common_1 = require("@nestjs/common");
const pessoa_service_1 = require("./pessoa.service");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const pessoadto_1 = require("./dto/pessoadto");
let PessoaController = class PessoaController {
    constructor(pessoaService) {
        this.pessoaService = pessoaService;
    }
    async backup() {
        await this.pessoaService.importDataFromCsv();
        return 'Data imported successfully';
    }
    async enderecoRepetido(cep, numero) {
        return this.pessoaService.buscaEnderecoRepetido(cep, numero);
    }
    async moverPessoaParaOutroResponsavel(body) {
        console.log('body', body);
        return this.pessoaService.moverPessoaParaOutroResponsavel(body);
    }
    async findall(take, skip, filter) {
        return this.pessoaService.findAll(take, skip, filter);
    }
    async findallForRelatorioPorData(dateinicial, datefinal, filter) {
        return this.pessoaService.findAllRelatorioPorData(dateinicial, datefinal, filter);
    }
    async create(createPessoaDto) {
        return this.pessoaService.create(createPessoaDto);
    }
    async findbyid(id) {
        return this.pessoaService.findById(id);
    }
    async findFamiliiaresByid(id) {
        return this.pessoaService.findFamiliiaresByid(id);
    }
    async findbyidEntrega(id) {
        return this.pessoaService.findbyidEntrega(id);
    }
    async update(id, updatePessoaDto) {
        return this.pessoaService.update(id, updatePessoaDto);
    }
    async findAllFamiliares(id, take, skip, filter) {
        return this.pessoaService.findAllFamiliares(id, take, skip, filter);
    }
    async chagneResponsavelFamiliar(idFamilar) {
        return this.pessoaService.changeResponsavelFamiliar(idFamilar);
    }
    async changeStatusPessoa(id) {
        return this.pessoaService.changeStatus(id);
    }
    async findallInativePessoas(take, skip, filter) {
        return this.pessoaService.findAllInativePessoas(take, skip, filter);
    }
    async buscarPessoaPorCpf(cpf) {
        return this.pessoaService.buscarPessoaPorCpf(cpf);
    }
};
exports.PessoaController = PessoaController;
__decorate([
    (0, common_1.Get)('/backup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "backup", null);
__decorate([
    (0, common_1.Get)('/endereco-repetido'),
    __param(0, (0, common_1.Query)('cep')),
    __param(1, (0, common_1.Query)('numero')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "enderecoRepetido", null);
__decorate([
    (0, common_1.Patch)('mover-para-responsavel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pessoadto_1.MoverPessoaDto]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "moverPessoaParaOutroResponsavel", null);
__decorate([
    (0, common_1.Get)(':take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('take')),
    __param(1, (0, common_1.Param)('skip')),
    __param(2, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findall", null);
__decorate([
    (0, common_1.Get)('datauserfind/:dateinicial/datefinal/:datefinal/:filter?'),
    __param(0, (0, common_1.Param)('dateinicial')),
    __param(1, (0, common_1.Param)('datefinal')),
    __param(2, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findallForRelatorioPorData", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findbyid", null);
__decorate([
    (0, common_1.Get)('pessoafamiliares/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findFamiliiaresByid", null);
__decorate([
    (0, common_1.Get)('entrega/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findbyidEntrega", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/familiares/:id/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('take')),
    __param(2, (0, common_1.Param)('skip')),
    __param(3, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findAllFamiliares", null);
__decorate([
    (0, common_1.Patch)('changeresponsavel/:idFamilar'),
    __param(0, (0, common_1.Param)('idFamilar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "chagneResponsavelFamiliar", null);
__decorate([
    (0, common_1.Patch)('changestatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "changeStatusPessoa", null);
__decorate([
    (0, roles_decorator_1.Roles)(['Admin']),
    (0, common_1.Get)('findallinative/:take/skip/:skip/:filter?'),
    __param(0, (0, common_1.Param)('take')),
    __param(1, (0, common_1.Param)('skip')),
    __param(2, (0, common_1.Param)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "findallInativePessoas", null);
__decorate([
    (0, common_1.Get)('buscar-por-cpf/:cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PessoaController.prototype, "buscarPessoaPorCpf", null);
exports.PessoaController = PessoaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('pessoa'),
    __metadata("design:paramtypes", [pessoa_service_1.PessoaService])
], PessoaController);
//# sourceMappingURL=pessoa.controller.js.map