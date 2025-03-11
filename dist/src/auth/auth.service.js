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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../usuario/usuario.service");
const bccrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usuarioService, jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }
    login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.nome,
            role: user.permissoes,
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
            id: user.id,
            email: user.email,
            nome: user.nome,
            role: user.permissoes,
            access_token: jwtToken,
        };
    }
    async validateUser(email, senha) {
        const user = await this.usuarioService.findbyemail(email);
        if (user) {
            const isPasswordValid = await bccrypt.compare(senha, user.senha);
            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                };
            }
        }
        throw new Error('Email ou Senha está incorreta');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map