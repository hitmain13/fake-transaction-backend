import { Controller, Post, Body, Get, Headers, UnauthorizedException, Delete, Param } from '@nestjs/common'
import { CreatePasswordDto } from './dto/create-password-dto'
import { PasswordService } from './password.service'

const AUTH_TOKEN = process.env.ADMIN_TOKEN || 'seu-token-seguro-aqui'

function checkAuth(token: string | undefined) {
  if (!token || token !== `Bearer ${AUTH_TOKEN}`) {
    throw new UnauthorizedException('Token inválido ou ausente')
  }
}

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  async create(@Body() body: CreatePasswordDto, @Headers('authorization') auth: string): Promise<any> {
    checkAuth(auth)
    return this.passwordService.create(body)
  }

  @Post('/authenticate')
  async get(@Body() body: CreatePasswordDto, @Headers('authorization') auth: string): Promise<any> {
    checkAuth(auth)
    return this.passwordService.compare(body.password)
  }

  @Get('/all')
  async getAll(@Headers('authorization') auth: string): Promise<any> {
    checkAuth(auth)
    return this.passwordService.getAllPasswords()
  }

  @Delete('/all')
  async deleteAll(@Headers('authorization') auth: string): Promise<any> {
    checkAuth(auth)
    return this.passwordService.deleteAllPasswords()
  }

  @Delete('/:password')
  async delete(@Param('password') password: string, @Headers('authorization') auth: string): Promise<any> {
    checkAuth(auth)
    return this.passwordService.delete(password)
  }
}
