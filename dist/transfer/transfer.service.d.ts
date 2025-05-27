import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
export declare class TransferService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTransfer(data: CreateTransferDto): Promise<string>;
    getTransferByHash(hash: string): Promise<{
        pix: string;
        id: string;
        hash: string;
        value: string;
        time: string;
        originName: string;
        originBank: string;
        originAgency: string;
        originAccount: string;
        originCpf: string;
        destName: string;
        destBank: string;
        destAgency: string;
        destAccount: string;
        destCpf: string;
        transactionId: string;
        createdAt: Date;
    }>;
}
