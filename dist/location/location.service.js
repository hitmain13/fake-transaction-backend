"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LocationService = class LocationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLocation(data) {
        const transfer = await this.prisma.transfer.findUnique({
            where: { hash: data.hash },
        });
        if (!transfer) {
            throw new common_1.BadRequestException('Transfer hash not found');
        }
        return this.prisma.location.create({
            data: {
                hash: data.hash,
                latitude: data.latitude,
                longitude: data.longitude,
            },
        });
    }
    async getLocationsByHash(hash) {
        return this.prisma.location.findMany({
            where: { hash },
            orderBy: { createdAt: 'asc' },
        });
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map