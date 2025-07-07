import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BuscaEntrega {
  @IsNotEmpty()
  dateinicial: string;

  @IsNotEmpty()
  datefinal: string;

  usuarioId: string;

  equipamentoId: string;

  pessoId: string;

  beneficioId: string;

  statusid: string;
}

export class DefIndef {
  @IsUUID()
  id: string;

  @IsUUID()
  usuarioId: string;

  @IsString()
  status: string;

  @IsString()
  motivo: string;

  @IsString()
  nivel?: string;
}
