import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
export declare class TransferController {
    private readonly transferService;
    constructor(transferService: TransferService);
    create(body: CreateTransferDto): Promise<{
        hash: string;
    }>;
    getByHash(hash: string): Promise<{
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
