import React, { useCallback, useEffect, useRef } from 'react';

import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { ScaleLoader } from 'react-spinners';

import { useAiAssistant } from '@/context/ai-assistant';

type AiChatProps = {
  socket: any;
};

const AiChat: React.FC<AiChatProps> = ({ socket }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { isTyping, threadId, messages, handleMessages, handleError } =
    useAiAssistant();

  const fetchMessages = useCallback(() => {
    if (socket && threadId) {
      socket.emit('get_messages', { threadId });
    }
  }, [socket, threadId]);

  useEffect(() => {
    if (socket) {
      socket.on('messages', handleMessages);
      socket.on('error', handleError);
    }

    return () => {
      if (socket) {
        socket.off('messages', handleMessages);
        socket.off('error', handleError);
      }
    };
  }, [socket, handleMessages, handleError]);

  useEffect(() => {
    if (threadId && socket) {
      fetchMessages();
    }
  }, [fetchMessages, threadId, socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isUser = (role: string) => (role === 'user' ? true : false);

  if (messages?.length === 0) {
    return;
  }

  return (
    <div className="py-5 flex flex-col gap-8">
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col gap-2.5 ${isUser(message.role) && 'items-end'}`}
          >
            <div className="w-fit">
              {isUser(message.role) ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div
              className={`border border-input p-2.5 rounded-md w-fit ${isUser(message.role) ? 'ml-5 bg-muted' : 'mr-5'}`}
            >
              <ReactMarkdown className="aiChat text-sm">
                {typeof message.content === 'string'
                  ? message.content
                  : message.content[0].text.value}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
      {isTyping && <ScaleLoader height={15} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AiChat;
