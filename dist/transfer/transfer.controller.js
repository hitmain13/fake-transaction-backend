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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const transfer_service_1 = require("./transfer.service");
const create_transfer_dto_1 = require("./dto/create-transfer.dto");
const AUTH_TOKEN = process.env.ADMIN_TOKEN || 'seu-token-seguro-aqui';
function checkAuth(token) {
    if (!token || token !== `Bearer ${AUTH_TOKEN}`) {
        console.log('Token inválido ou ausente', token);
        throw new common_1.UnauthorizedException('Token inválido ou ausente');
    }
}
let TransferController = class TransferController {
    transferService;
    constructor(transferService) {
        this.transferService = transferService;
    }
    async create(body, auth) {
        checkAuth(auth);
        const hash = await this.transferService.createTransfer(body);
        return { hash };
    }
    async getByHash(hash, auth) {
        checkAuth(auth);
        return this.transferService.getTransferByHash(hash);
    }
    async deleteByHash(hash, auth) {
        checkAuth(auth);
        return this.transferService.deleteTransferByHash(hash);
    }
    async deleteAll(auth) {
        checkAuth(auth);
        return this.transferService.deleteAllTransfers();
    }
};
exports.TransferController = TransferController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto, String]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':hash'),
    __param(0, (0, common_1.Param)('hash')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "getByHash", null);
__decorate([
    (0, common_1.Delete)(':hash'),
    __param(0, (0, common_1.Param)('hash')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "deleteByHash", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "deleteAll", null);
exports.TransferController = TransferController = __decorate([
    (0, common_1.Controller)('transfer'),
    __metadata("design:paramtypes", [transfer_service_1.TransferService])
], TransferController);
//# sourceMappingURL=transfer.controller.js.map