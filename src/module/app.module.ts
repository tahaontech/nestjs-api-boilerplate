import { Module } from '@nestjs/common';
import { AppController } from 'src/controller';
import { AppService } from 'src/service';
import { PrismaModule } from 'src/prisma';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
