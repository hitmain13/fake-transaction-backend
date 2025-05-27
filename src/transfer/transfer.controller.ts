import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { TransferService } from './transfer.service'
import { CreateTransferDto } from './dto/create-transfer.dto'

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() body: CreateTransferDto) {
    const hash = await this.transferService.createTransfer(body)
    return { hash }
  }

  @Get(':hash')
  async getByHash(@Param('hash') hash: string) {
    return this.transferService.getTransferByHash(hash)
  }
}
