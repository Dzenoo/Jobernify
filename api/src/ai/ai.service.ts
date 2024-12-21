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

  async generateCoverLetter({
    jobData,
    seekerData,
  }: {
    jobData: any;
    seekerData: any;
  }) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'developer',
          content:
            'You are an AI assistant helping users craft professional and personalized cover letters for job applications. Ensure the cover letter is formal, tailored to the job description, and highlights relevant skills and experiences. Avoid generating placeholder text like [Your Name], [Company Name], or [Job Title]. Use the provided information directly.',
        },
        {
          role: 'user',
          content: `
                    Job Information:
                    - Job Title: ${jobData.title}
                    - Overview of Job: ${jobData.overview}
                    - Job Description: ${jobData.description}
                    - Required Skills: ${jobData.skills}
                    
                    Seeker Information:
                    - Name: ${seekerData.first_name} ${seekerData.last_name}
                    - Experience: ${seekerData.experience}
                    - Relevant Skills: ${seekerData.skills}
                    - Education: ${seekerData.education}
                    - Socials: ${seekerData.github} ${seekerData.linkedin} ${seekerData.portfolio}

                    Please craft a professional cover letter based on the above information. The letter should be personalized to match the job responsibilities with the seeker’s experience and skills, and demonstrate why the applicant is an excellent fit for the role at ${jobData.company}. 
                  `,
        },
      ],
    });

    return completion.choices[0].message.content;
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

    await this.openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistant.id,
    });

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
