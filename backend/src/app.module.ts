import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinanceController } from './finance/finance.controller';
import { FinanceService } from './finance/finance.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, FinanceController],
  providers: [AppService, FinanceService, PrismaService],
})
export class AppModule {}
