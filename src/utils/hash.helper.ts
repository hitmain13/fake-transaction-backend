import { createHash } from 'crypto'
import { CreateTransferDto } from 'src/transfer/dto/create-transfer.dto'
import { v4 as uuidv4 } from 'uuid'

export function generateTransferHash(data: CreateTransferDto, length: number = 12): string {
  // Cria o hash com sha256
  const baseString = JSON.stringify(data) + uuidv4()
  const hash = createHash('sha256').update(baseString).digest('base64')

  // Trunca o hash para o tamanho desejado (limite de 12 ou 15 caracteres)
  return hash.substring(0, length) // O parâmetro `length` pode ser 12 ou 15
}
