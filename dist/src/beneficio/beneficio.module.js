"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficioModule = void 0;
const common_1 = require("@nestjs/common");
const beneficio_service_1 = require("./beneficio.service");
const beneficio_controller_1 = require("./beneficio.controller");
let BeneficioModule = class BeneficioModule {
};
exports.BeneficioModule = BeneficioModule;
exports.BeneficioModule = BeneficioModule = __decorate([
    (0, common_1.Module)({
        controllers: [beneficio_controller_1.BeneficioController],
        providers: [beneficio_service_1.BeneficioService],
    })
], BeneficioModule);
//# sourceMappingURL=beneficio.module.js.map