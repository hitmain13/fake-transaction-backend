import { IsString, IsNumber } from 'class-validator'

export class CreateLocationDto {
  @IsString()
  hash: string

  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number
}
