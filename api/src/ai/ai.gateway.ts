import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { AiService } from './ai.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AiGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly aiService: AiService) {}

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() { threadId, message }: { threadId: string; message: string },
  ) {
    const response = await this.aiService.addMessageToThread(threadId, message);
    return { assistantMessage: response.assistantMessage };
  }

  @SubscribeMessage('create_thread')
  async handleCreateThread() {
    const thread = await this.aiService.createThread();
    return { threadId: thread.id };
  }

  @SubscribeMessage('get_messages')
  async handleGetMessages(@MessageBody() { threadId }: { threadId: string }) {
    const messages = await this.aiService.getMessagesFromThread(threadId);
    return { messages };
  }
}
