import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLocationDto } from './dto/create-location.dto'

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLocation(data: CreateLocationDto) {
    // Verifica se o hash existe na tabela Transfer
    const transfer = await this.prisma.transfer.findUnique({
      where: { hash: data.hash },
    })
    if (!transfer) {
      throw new BadRequestException('Transfer hash not found')
    }
    return this.prisma.location.create({
      data: {
        hash: data.hash,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
  }

  async getLocationsByHash(hash: string) {
    return this.prisma.location.findMany({
      where: { hash },
      orderBy: { createdAt: 'asc' },
    })
  }
}
