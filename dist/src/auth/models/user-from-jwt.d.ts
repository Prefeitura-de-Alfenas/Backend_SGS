import { Prisma } from '@prisma/client';
export interface UserFromJwt {
    id: string;
    email: string;
    name: string;
    role: Prisma.UsuariosOnPermissoesCreateNestedManyWithoutUsuarioInput;
}
