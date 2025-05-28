import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { LocationService } from './location.service'
import { CreateLocationDto } from './dto/create-location.dto'

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto)
  }

  @Get(':hash')
  async getByHash(@Param('hash') hash: string) {
    return this.locationService.getLocationsByHash(hash)
  }

  @Get()
  async getAll() {
    return this.locationService.getAllLocations()
  }
}
