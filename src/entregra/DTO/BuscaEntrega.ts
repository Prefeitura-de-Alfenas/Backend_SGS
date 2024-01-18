import {IsNotEmpty } from 'class-validator';

export class BuscaEntrega {

    @IsNotEmpty()
    dateinicial:string;

    @IsNotEmpty()
    datefinal:string;

    usuarioId: string;

 
    equipamentoId: string;


    pessoId: string;

  
    beneficioId: string;
}
