import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import databaseConfig from './config/pg.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(databaseConfig), GroupModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
