import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransferModule } from './transfer/transfer.module'
import { LocationModule } from './location/location.module'
import { PrismaService } from './prisma/prisma.service'
import { PasswordModule } from './password/password.module'

@Module({
  imports: [TransferModule, LocationModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
