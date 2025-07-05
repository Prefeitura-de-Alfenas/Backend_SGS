import { IsUUID } from 'class-validator';

export class MoverPessoaDto {
  @IsUUID()
  pessoaId: string;

  @IsUUID()
  novoResponsavelId: string;
}
