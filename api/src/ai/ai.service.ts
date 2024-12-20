import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      project: this.configService.get('OPENAI_PROJECT_ID'),
      organization: this.configService.get('OPENAI_ORGANIZATION_ID'),
    });
  }

  async getAssistant() {
    return await this.openai.beta.assistants.retrieve(
      this.configService.get('OPENAI_ASSISTANT_ID'),
    );
  }

  async createThread() {
    const thread = await this.openai.beta.threads.create();
    return thread;
  }

  async addMessageToThread(threadId: string, message: string) {
    const messageResponse = await this.openai.beta.threads.messages.create(
      threadId,
      {
        role: 'user',
        content: message,
      },
    );

    const assistant = await this.getAssistant();
    const runResponse = await this.openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: assistant.id,
      },
    );

    const messages = await this.getMessagesFromThread(threadId);

    const assistantMessageObj: any = messages
      .filter((msg) => msg.role === 'assistant')
      .pop();

    const assistantMessage =
      assistantMessageObj?.content[0]?.text.value ||
      'No response from assistant.';

    return {
      userMessage: messageResponse,
      assistantMessage,
    };
  }

  async getMessagesFromThread(threadId: string) {
    const messages = await this.openai.beta.threads.messages.list(threadId);
    return messages.data.reverse().map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  }
}
