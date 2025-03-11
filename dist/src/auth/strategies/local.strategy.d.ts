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
        createdAt: Date;
        updatedAt: Date | null;
        status: import(".prisma/client").$Enums.status_code;
        email: string;
        telefone: string;
        equipamentoId: string;
    }>;
}
export {};
