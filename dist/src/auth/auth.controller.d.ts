import { AuthService } from './auth.service';
import { AuthRequest } from './models/auth-request';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: AuthRequest): import("./models/user-token").UserToken;
    getMe(user: any): any;
}
