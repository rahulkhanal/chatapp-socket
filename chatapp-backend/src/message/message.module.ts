import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { MessageEntity } from 'src/models/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,MessageEntity])],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
