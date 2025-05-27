import { generateTransferHash } from './hash.helper'
import { CreateTransferDto } from '../transfer/dto/create-transfer.dto'

describe('generateTransferHash', () => {
  it('deve gerar hashes únicos e em base64', () => {
    const data: CreateTransferDto = {
      valor: '1000',
      pix: '11999999999',
      horario: '12:00',
      origem_nome: 'João',
      origem_instituicao: 'Banco X',
      origem_agencia: '0001',
      origem_conta: '12345-6',
      origem_cpf: '123.456.789-00',
      destino_nome: 'Maria',
      destino_instituicao: 'Banco Y',
      destino_agencia: '0002',
      destino_conta: '65432-1',
      destino_cpf: '987.654.321-00',
      transacao_id: 'abc123',
    }
    const hash1 = generateTransferHash(data)
    const hash2 = generateTransferHash(data)
    expect(hash1).not.toEqual(hash2)
    expect(typeof hash1).toBe('string')
    expect(hash1).toMatch(/^[A-Za-z0-9+/=]+$/)
  })
})
