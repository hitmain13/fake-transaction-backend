import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransferModule } from './transfer/transfer.module'
import { LocationModule } from './location/location.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [TransferModule, LocationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
