import { UsuarioService } from 'src/usuario/usuario.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';
export declare class AuthService {
    private readonly usuarioService;
    private readonly jwtService;
    constructor(usuarioService: UsuarioService, jwtService: JwtService);
    login(user: Prisma.UsuarioCreateInput): UserToken;
    validateUser(email: string, senha: string): Promise<{
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
