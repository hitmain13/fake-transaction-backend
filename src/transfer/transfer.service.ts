import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTransferDto } from './dto/create-transfer.dto'
import { generateTransferHash } from '../utils/hash.helper'

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransfer(data: CreateTransferDto): Promise<string> {
    if (!data) {
      console.log('Data is required')
      throw new BadRequestException('Data is required')
    }

    // Verifica se já existe uma transferência com os mesmos dados
    const existing = await this.findExistingTransfer(data)
    if (existing) {
      console.log('Returned a transfer hash that was already created!', existing.hash)
      return existing.hash
    }

    const hash = generateTransferHash(data)
    // Verifica se já existe o hash (colisão improvável, mas por segurança)
    const exists = await this.prisma.transfer.findUnique({ where: { hash } })
    if (exists) {
      return exists.hash
    }
    await this.prisma.transfer.create({
      data: {
        hash,
        value: data.valor,
        pix: data.pix,
        time: data.horario,
        originName: data.origem_nome,
        originBank: data.origem_instituicao,
        originAgency: data.origem_agencia,
        originAccount: data.origem_conta,
        originCpf: data.origem_cpf,
        destName: data.destino_nome,
        destBank: data.destino_instituicao,
        destAgency: data.destino_agencia,
        destAccount: data.destino_conta,
        destCpf: data.destino_cpf,
        transactionId: data.transacao_id,
      },
    })
    console.log('Transfer created successfully!', hash)
    return hash
  }

  private async findExistingTransfer(data: CreateTransferDto) {
    return this.prisma.transfer.findFirst({
      where: {
        value: data.valor,
        pix: data.pix,
        time: data.horario,
        originName: data.origem_nome,
        originBank: data.origem_instituicao,
        originAgency: data.origem_agencia,
        originAccount: data.origem_conta,
        originCpf: data.origem_cpf,
        destName: data.destino_nome,
        destBank: data.destino_instituicao,
        destAgency: data.destino_agencia,
        destAccount: data.destino_conta,
        destCpf: data.destino_cpf,
        transactionId: data.transacao_id,
      },
    })
  }

  async getTransferByHash(hash: string) {
    const transfer = await this.prisma.transfer.findUnique({ where: { hash } })
    if (!transfer) {
      console.log('Transfer not found', hash)
      throw new BadRequestException('Transfer not found')
    }
    return transfer
  }

  async deleteTransferByHash(hash: string) {
    const transfer = await this.prisma.transfer.findUnique({ where: { hash } })
    if (!transfer) {
      console.log('Transfer not found', hash)
      throw new BadRequestException('Transfer not found')
    }
    await this.prisma.transfer.delete({ where: { hash } })
    console.log('Transfer deleted successfully', hash)
    return { message: 'Transfer deleted successfully', hash }
  }

  async deleteAllTransfers() {
    await this.prisma.location.deleteMany({})
    await this.prisma.transfer.deleteMany({})
    console.log('All transfers deleted successfully')
    return { message: 'All transfers deleted successfully' }
  }
}
