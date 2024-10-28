import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/models/message.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/models/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
  async sendMessage(senderId: number, receiverId: number, content: string) {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      content,
      timestamp: new Date(),
      sender,
      receiver
    });

    return await this.messageRepository.save(message);
  }

}
