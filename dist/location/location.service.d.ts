import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLocation(data: CreateLocationDto): Promise<{
        id: string;
        hash: string;
        createdAt: Date;
        latitude: number;
        longitude: number;
    }>;
    getLocationsByHash(hash: string): Promise<{
        id: string;
        hash: string;
        createdAt: Date;
        latitude: number;
        longitude: number;
    }[]>;
}
