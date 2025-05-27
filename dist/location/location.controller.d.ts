import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<{
        id: string;
        hash: string;
        createdAt: Date;
        latitude: number;
        longitude: number;
    }>;
    getByHash(hash: string): Promise<{
        id: string;
        hash: string;
        createdAt: Date;
        latitude: number;
        longitude: number;
    }[]>;
}
