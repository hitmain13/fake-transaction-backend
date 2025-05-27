import { IsString } from 'class-validator'

export class CreateTransferDto {
  @IsString()
  valor: string
  @IsString()
  pix: string
  @IsString()
  horario: string
  @IsString()
  origem_nome: string
  @IsString()
  origem_instituicao: string
  @IsString()
  origem_agencia: string
  @IsString()
  origem_conta: string
  @IsString()
  origem_cpf: string
  @IsString()
  destino_nome: string
  @IsString()
  destino_instituicao: string
  @IsString()
  destino_agencia: string
  @IsString()
  destino_conta: string
  @IsString()
  destino_cpf: string
  @IsString()
  transacao_id: string
}
