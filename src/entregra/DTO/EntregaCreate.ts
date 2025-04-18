import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEntregaDto {
  @IsNotEmpty()
  usuarioId: string;

  @IsNotEmpty()
  equipamentoId: string;

  @IsNotEmpty()
  pessoId: string;

  @IsNotEmpty()
  quantidade: number;

  @IsNotEmpty()
  observacao: string;

  @IsNotEmpty()
  beneficioId: string;
}
