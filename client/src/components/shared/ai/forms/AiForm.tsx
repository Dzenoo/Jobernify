'use client';

import React, { useCallback, useEffect } from 'react';

import { z } from 'zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAiAssistant } from '@/context/ai-assistant';
import { AiFormSchema } from '@/lib/zod/ai.validation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type AiFormProps = {
  socket: any;
};

const AiForm: React.FC<AiFormProps> = ({ socket }) => {
  const {
    isTyping,
    setIsTyping,
    threadId,
    setMessages,
    handleAssistantMessage,
    handleThreadCreated,
  } = useAiAssistant();

  const form = useForm<z.infer<typeof AiFormSchema>>({
    resolver: zodResolver(AiFormSchema),
    defaultValues: {
      question: '',
    },
  });

  const onSubmit = (values: z.infer<typeof AiFormSchema>) => {
    if (socket && threadId) {
      setIsTyping(true);
      socket.emit('send_message', { threadId, message: values.question });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: values.question },
      ]);
      form.reset();
    }
  };

  const createThread = useCallback(() => {
    if (socket) {
      setIsTyping(true);
      socket.emit('create_thread');
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('assistant_message', handleAssistantMessage);
      socket.on('thread_created', handleThreadCreated);
    }

    return () => {
      if (socket) {
        socket.off('assistant_message', handleAssistantMessage);
        socket.off('thread_created', handleThreadCreated);
      }
    };
  }, [socket, handleAssistantMessage, handleThreadCreated]);

  useEffect(() => {
    if (!threadId && socket) {
      createThread();
    }
  }, [createThread, threadId, socket]);

  return (
    <Form {...form}>
      <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder="Type here..."
                  className="pr-10 resize-none hide-scrollbar"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="ghost"
          disabled={!form.formState.isValid || isTyping}
          type="submit"
          className="absolute bottom-1.5 right-1.5 p-2 w-8 h-8 rounded-full"
        >
          {form.formState.isLoading ? (
            <ClipLoader className="w-5 h-5" />
          ) : (
            <Send className="w-8 h-8" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AiForm;
