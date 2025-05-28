import { Controller, Post, Body, Get, Param, Delete, Headers, UnauthorizedException } from '@nestjs/common'
import { TransferService } from './transfer.service'
import { CreateTransferDto } from './dto/create-transfer.dto'

const AUTH_TOKEN = process.env.ADMIN_TOKEN || 'seu-token-seguro-aqui'

function checkAuth(token: string | undefined) {
  if (!token || token !== `Bearer ${AUTH_TOKEN}`) {
    console.log('Token inválido ou ausente', token)
    throw new UnauthorizedException('Token inválido ou ausente')
  }
}

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() body: CreateTransferDto, @Headers('authorization') auth: string) {
    checkAuth(auth)
    const hash = await this.transferService.createTransfer(body)
    return { hash }
  }

  @Get(':hash')
  async getByHash(@Param('hash') hash: string, @Headers('authorization') auth: string) {
    checkAuth(auth)
    return this.transferService.getTransferByHash(hash)
  }

  @Delete(':hash')
  async deleteByHash(@Param('hash') hash: string, @Headers('authorization') auth: string) {
    checkAuth(auth)
    return this.transferService.deleteTransferByHash(hash)
  }

  @Delete()
  async deleteAll(@Headers('authorization') auth: string) {
    checkAuth(auth)
    return this.transferService.deleteAllTransfers()
  }
}
