import { Prisma } from "@prisma/client";


export interface UserToken {
    email: string,
    nome: string,
    role:Prisma.UsuariosOnPermissoesCreateNestedManyWithoutUsuarioInput,
    access_token: string
}