'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

type Message =
  | {
      role: string;
      content: string;
    }
  | {
      role: string;
      content: {
        text: {
          value: string;
        };
      }[];
    };

export const AiAssistantContext = createContext<{
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  threadId: string | null;
  setThreadId: React.Dispatch<React.SetStateAction<string | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  handleAssistantMessage: (data: { message: string }) => void;
  handleThreadCreated: (data: { threadId: string }) => void;
  handleMessages: (data: { messages: Message[] }) => void;
  handleError: (data: { message: string }) => void;
  handleReset: () => void;
}>({
  isTyping: false,
  setIsTyping: () => {},
  threadId: null,
  setThreadId: () => {},
  messages: [],
  setMessages: () => {},
  handleAssistantMessage: () => {},
  handleThreadCreated: () => {},
  handleMessages: () => {},
  handleError: () => {},
  handleReset: () => {},
});

export const AiAssistantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAssistantMessage = useCallback(
    (data: { message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.message },
      ]);
      setIsTyping(false);
    },
    [setMessages],
  );

  const handleThreadCreated = useCallback(
    (data: { threadId: string }) => {
      setThreadId(data.threadId);
      setIsTyping(false);
    },
    [setThreadId],
  );

  const handleMessages = useCallback(
    (data: { messages: any[] }) => {
      setMessages(data.messages);
    },
    [setMessages],
  );

  const handleError = useCallback((data: { message: string }) => {
    console.error('Error:', data.message);
    setIsTyping(false);
  }, []);

  const handleReset = useCallback(() => {
    setThreadId(null);
    setMessages([]);
  }, []);

  return (
    <AiAssistantContext.Provider
      value={{
        isTyping,
        setIsTyping,
        threadId,
        setThreadId,
        messages,
        setMessages,
        handleAssistantMessage,
        handleThreadCreated,
        handleMessages,
        handleError,
        handleReset,
      }}
    >
      {children}
    </AiAssistantContext.Provider>
  );
};

export const useAiAssistant = () => useContext(AiAssistantContext);
