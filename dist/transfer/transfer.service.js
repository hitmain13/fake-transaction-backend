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
exports.TransferService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const hash_helper_1 = require("../utils/hash.helper");
let TransferService = class TransferService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTransfer(data) {
        const hash = (0, hash_helper_1.generateTransferHash)(data);
        const exists = await this.prisma.transfer.findUnique({ where: { hash } });
        if (exists) {
            throw new common_1.BadRequestException('Transfer already exists');
        }
        await this.prisma.transfer.create({
            data: {
                hash,
                value: data.valor,
                pix: data.pix,
                time: data.horario,
                originName: data.origem_nome,
                originBank: data.origem_instituicao,
                originAgency: data.origem_agencia,
                originAccount: data.origem_conta,
                originCpf: data.origem_cpf,
                destName: data.destino_nome,
                destBank: data.destino_instituicao,
                destAgency: data.destino_agencia,
                destAccount: data.destino_conta,
                destCpf: data.destino_cpf,
                transactionId: data.transacao_id,
            },
        });
        return hash;
    }
    async getTransferByHash(hash) {
        const transfer = await this.prisma.transfer.findUnique({ where: { hash } });
        if (!transfer) {
            throw new common_1.BadRequestException('Transfer not found');
        }
        return transfer;
    }
};
exports.TransferService = TransferService;
exports.TransferService = TransferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransferService);
//# sourceMappingURL=transfer.service.js.map