import {  Prisma } from "@prisma/client";

export interface UserPayload {
    sub: string,
    email:string,
    name:string,
    role:Prisma.UsuariosOnPermissoesCreateNestedManyWithoutUsuarioInput
    iat?:number,
    exp?:number,
}