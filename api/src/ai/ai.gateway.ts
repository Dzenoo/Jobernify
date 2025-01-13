import { UseGuards } from '@nestjs/common';

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Throttle } from '@nestjs/throttler';

import { Server, Socket } from 'socket.io';

import { WsJwtGuard } from '@/authentication/guards/ws-jwt.guard';
import { SocketAuthMiddleware } from '@/authentication/middlewares/ws.middleware';

import { AiService } from '@/ai/ai.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'https://www.jobernify.com',
      'https://jobernify.com',
    ],
    credentials: true,
  },
  transports: ['websocket'],
})
@UseGuards(WsJwtGuard)
export class AiGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly aiService: AiService) {}

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() payload: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { threadId, message } = payload;
    try {
      const response = await this.aiService.addMessageToThread(
        client,
        threadId,
        message,
      );
      client.emit('assistant_message', { message: response.assistantMessage });
    } catch (error) {
      client.emit('error', { message: 'Failed to send message.' });
    }
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @SubscribeMessage('create_thread')
  async handleCreateThread(@ConnectedSocket() client: Socket) {
    try {
      const thread = await this.aiService.createThread();
      client.emit('thread_created', { threadId: thread.id });
    } catch (error) {
      client.emit('error', { message: 'Failed to create thread.' });
    }
  }

  @SubscribeMessage('get_messages')
  async handleGetMessages(
    @MessageBody() payload: { threadId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { threadId } = payload;
    try {
      const messages = await this.aiService.getMessagesFromThread(threadId);
      client.emit('messages', { messages });
    } catch (error) {
      client.emit('error', { message: 'Failed to fetch messages.' });
    }
  }
}
