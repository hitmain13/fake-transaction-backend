import { IsString, IsNumber, ValidateIf } from 'class-validator'

export class CreateLocationDto {
  @IsString()
  hash: string

  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number

  @IsNumber()
  accuracy: number

  @ValidateIf((obj: Record<string, unknown>) => obj.altitude !== null)
  @IsNumber()
  altitude: number | null

  @ValidateIf((obj: Record<string, unknown>) => obj.altitudeAccuracy !== null)
  @IsNumber()
  altitudeAccuracy: number | null

  @ValidateIf((obj: Record<string, unknown>) => obj.heading !== null)
  @IsNumber()
  heading: number | null

  @ValidateIf((obj: Record<string, unknown>) => obj.speed !== null)
  @IsNumber()
  speed: number | null
}
