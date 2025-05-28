import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLocationDto } from './dto/create-location.dto'

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createLocation(data: CreateLocationDto) {
    const transfer = await this.prisma.transfer.findUnique({
      where: { hash: data.hash },
    })

    if (!transfer) {
      console.log('[CREATE Location] Location hash not found', data.hash)
      throw new BadRequestException('Location hash not found', data.hash)
    }

    const location = await this.prisma.location
      .create({
        data: {
          hash: data.hash,
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy,
          altitude: data.altitude,
          altitudeAccuracy: data.altitudeAccuracy,
          heading: data.heading,
          speed: data.speed,
        },
      })
      .finally(() => console.log('[CREATE Location] location created with hash', data.hash))

    return location
  }

  async getLocationsByHash(hash: string) {
    console.log('[GET Locations] getting locations by hash', hash)
    return this.prisma.location.findMany({
      where: { hash },
      orderBy: { createdAt: 'asc' },
    })
  }

  async getAllLocations() {
    console.log('[GET All Locations] getting all locations')
    return this.prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
