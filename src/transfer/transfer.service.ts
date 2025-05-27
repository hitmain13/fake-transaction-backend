import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTransferDto } from './dto/create-transfer.dto'
import { generateTransferHash } from '../utils/hash.helper'

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransfer(data: CreateTransferDto): Promise<string> {
    const hash = generateTransferHash(data)
    // Verifica se já existe
    const exists = await this.prisma.transfer.findUnique({ where: { hash } })
    if (exists) {
      throw new BadRequestException('Transfer already exists')
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
    return hash
  }

  async getTransferByHash(hash: string) {
    const transfer = await this.prisma.transfer.findUnique({ where: { hash } })
    if (!transfer) {
      throw new BadRequestException('Transfer not found')
    }
    return transfer
  }
}
