// src/ai/ai.gateway.ts

import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AiService } from './ai.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class AiGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AiGateway.name);

  constructor(private readonly aiService: AiService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() payload: { threadId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { threadId, message } = payload;
    try {
      const response = await this.aiService.addMessageToThread(
        threadId,
        message,
      );
      client.emit('assistant_message', { message: response.assistantMessage });
    } catch (error) {
      this.logger.error('Error handling send_message', error);
      client.emit('error', { message: 'Failed to send message.' });
    }
  }

  @SubscribeMessage('create_thread')
  async handleCreateThread(@ConnectedSocket() client: Socket) {
    try {
      const thread = await this.aiService.createThread();
      client.emit('thread_created', { threadId: thread.id });
    } catch (error) {
      this.logger.error('Error handling create_thread', error);
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
      this.logger.error('Error handling get_messages', error);
      client.emit('error', { message: 'Failed to fetch messages.' });
    }
  }
}
