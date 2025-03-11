import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, senha: string): Promise<{
        senha: any;
        permissoes: string[];
        id: string;
        nome: string;
        email: string;
        telefone: string;
        status: import(".prisma/client").$Enums.status_code;
        equipamentoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
