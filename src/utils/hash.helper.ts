import { v4 as uuidv4 } from 'uuid'
import { createHash } from 'crypto'
import { CreateTransferDto } from '../transfer/dto/create-transfer.dto'

export function generateTransferHash(data: CreateTransferDto): string {
  const baseString = JSON.stringify(data) + uuidv4()
  return createHash('sha256').update(baseString).digest('base64')
}
