import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import config from '../ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
