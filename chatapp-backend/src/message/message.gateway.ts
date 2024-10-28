import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { senderId: number; receiverId: number; content: string }) {
    const message = await this.messageService.sendMessage(payload.senderId, payload.receiverId, payload.content);
    this.server.emit('newMessage', message);
    return message;
  }
}
