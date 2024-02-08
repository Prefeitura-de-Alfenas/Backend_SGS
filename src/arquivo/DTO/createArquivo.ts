import {IsNotEmpty } from 'class-validator';

export class CreateArquivo {

    @IsNotEmpty()
    nome:string;


    @IsNotEmpty()
    pessoId: string;

  
 
}
