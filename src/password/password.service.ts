import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePasswordDto } from './dto/create-password-dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

@Injectable()
export class PasswordService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePasswordDto) {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)
    console.log('Creating password', data.password, hashedPassword)
    const existing = await this.get(data.password)
    if (existing) {
      console.log('Password already exists')
      return existing
    }
    return await this.prisma.password.create({ data: { password: hashedPassword } })
  }

  async get(password: string) {
    const savedPasswords = await this.prisma.password.findMany()
    for (const saved of savedPasswords) {
      const isMatch = await bcrypt.compare(password, saved.password)
      if (isMatch) {
        console.log('Password found', password)
        return saved
      }
    }

    console.log('Password not found', password)
    return null
  }

  async getAllPasswords() {
    const result = await this.prisma.password.findMany()
    console.log('Getting all passwords', result)
    return result
  }

  async delete(password: string) {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const passwordExists = await this.prisma.password.findFirst({ where: { password: passwordHash } })
    if (!passwordExists) {
      console.log('DELETE Password not found', password)
      throw new BadRequestException('Password not found')
    }
    const result = await this.prisma.password.delete({ where: { id: passwordExists.id } })
    console.log('Deleting password', password, result)
    return result
  }

  async deleteAllPasswords() {
    await this.prisma.password.deleteMany({})
    console.log('Deleting all passwords')
    return { message: 'All passwords deleted' }
  }

  async compare(inputPassword: string): Promise<boolean> {
    const saved = await this.get(inputPassword)

    if (!saved) {
      console.log('No matching password found for:', inputPassword)
      return false
    }

    const result = await bcrypt.compare(inputPassword, saved.password)
    console.log('Password match result:', result)
    return result
  }
}
