import { Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/user-from-jwt';
import { UserPayload } from '../models/membro-payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserPayload): Promise<UserFromJwt>;
}
export {};
