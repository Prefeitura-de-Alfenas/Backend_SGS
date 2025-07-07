import { IsString, IsUUID } from 'class-validator';

export class MoverPessoaDto {
  @IsUUID()
  pessoaId: string;

  @IsUUID()
  novoResponsavelId: string;
}

export class ChanceStatusDto {
  @IsUUID()
  usuarioId: string;

  @IsUUID()
  id: string;

  @IsString()
  motivo: string;
}
