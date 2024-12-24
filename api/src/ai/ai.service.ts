import { forwardRef, Inject, Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { SeekersService } from 'src/models/seekers/seekers.service';
import { JobsService } from 'src/models/jobs/jobs.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(
    @Inject(forwardRef(() => SeekersService))
    private readonly seekersService: SeekersService,
    @Inject(forwardRef(() => JobsService))
    private readonly jobsService: JobsService,
    private readonly configService: ConfigService,
  ) {
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

  async addMessageToThread(client: any, threadId: string, userMessage: string) {
    const messageResponse = await this.openai.beta.threads.messages.create(
      threadId,
      {
        role: 'user',
        content: userMessage,
      },
    );

    let run = await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: (await this.getAssistant()).id,
    });

    while (true) {
      run = await this.openai.beta.threads.runs.retrieve(threadId, run.id);

      if (run.status === 'requires_action') {
        // We need to parse the function calls
        run = await this.handleToolCalls(client, threadId, run);
      } else if (run.status === 'in_progress') {
        // Wait a bit, then poll again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else if (run.status === 'completed') {
        // The run is finished; let's get the final assistant message
        break;
      } else if (run.status === 'failed') {
        throw new Error('Assistant run failed.');
      }
    }

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

  private async handleToolCalls(client: any, threadId: string, run: any) {
    const toolCalls = run.required_action.submit_tool_outputs.tool_calls;
    const toolOutputs = [];

    for (const call of toolCalls) {
      const funcName = call.function.name;
      // const args = JSON.parse(call.function.arguments || '{}');

      if (funcName === 'searchJobs') {
        // const seekerId = args.seekerId;
        const seekerId = client.handshake.auth?.seekerId;
        const matchingJobs = await this.jobsService.findMatchingJobs(seekerId);

        toolOutputs.push({
          tool_call_id: call.id,
          output: JSON.stringify(matchingJobs),
        });
      }
      // else if (funcName === 'someOtherFunction') { ... }
    }

    return this.openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
      tool_outputs: toolOutputs,
    });
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
          role: 'system',
          content:
            'You are an AI assistant helping users craft professional and personalized cover letters for job applications. Ensure the cover letter is formal, tailored to the job description, and highlights relevant skills and experiences.',
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
}
