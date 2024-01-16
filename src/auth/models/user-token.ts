import { Prisma } from "@prisma/client";


export interface UserToken {
    id:string;
    email: string,
    nome: string,
    role:Prisma.UsuariosOnPermissoesCreateNestedManyWithoutUsuarioInput,
    access_token: string
}