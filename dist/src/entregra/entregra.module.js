"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntregraModule = void 0;
const common_1 = require("@nestjs/common");
const entregra_service_1 = require("./entregra.service");
const entregra_controller_1 = require("./entregra.controller");
let EntregraModule = class EntregraModule {
};
exports.EntregraModule = EntregraModule;
exports.EntregraModule = EntregraModule = __decorate([
    (0, common_1.Module)({
        controllers: [entregra_controller_1.EntregraController],
        providers: [entregra_service_1.EntregraService],
    })
], EntregraModule);
//# sourceMappingURL=entregra.module.js.map