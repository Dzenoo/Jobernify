'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { MessageCircle } from 'lucide-react';

import { useWebSocket } from '@/hooks/core/useWebSocket.hook';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const JobernifyAi: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { connect, disconnect, socket } = useWebSocket({
    url: 'ws://localhost:8080', // Use ws:// protocol
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle incoming assistant messages
  const handleAssistantMessage = useCallback(
    (data: { message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.message },
      ]);
      setIsLoading(false);
    },
    [setMessages],
  );

  // Handle thread creation
  const handleThreadCreated = useCallback(
    (data: { threadId: string }) => {
      setThreadId(data.threadId);
      setIsLoading(false);
    },
    [setThreadId],
  );

  // Handle fetched messages
  const handleMessages = useCallback(
    (data: { messages: any[] }) => {
      setMessages(data.messages);
    },
    [setMessages],
  );

  // Handle errors
  const handleError = useCallback((data: { message: string }) => {
    console.error('WebSocket Error:', data.message);
    setError(data.message);
    setIsLoading(false);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (socket) {
      socket.on('assistant_message', handleAssistantMessage);
      socket.on('thread_created', handleThreadCreated);
      socket.on('messages', handleMessages);
      socket.on('error', handleError);
    }

    return () => {
      if (socket) {
        socket.off('assistant_message', handleAssistantMessage);
        socket.off('thread_created', handleThreadCreated);
        socket.off('messages', handleMessages);
        socket.off('error', handleError);
      }
    };
  }, [
    socket,
    handleAssistantMessage,
    handleThreadCreated,
    handleMessages,
    handleError,
  ]);

  const sendMessage = useCallback(() => {
    if (socket && threadId && newMessage.trim()) {
      setIsLoading(true);
      socket.emit('send_message', { threadId, message: newMessage });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: newMessage },
      ]);
      setNewMessage('');
    }
  }, [socket, threadId, newMessage]);

  const createThread = useCallback(() => {
    if (socket) {
      setIsLoading(true);
      socket.emit('create_thread');
    }
  }, [socket]);

  const fetchMessages = useCallback(() => {
    if (socket && threadId) {
      socket.emit('get_messages', { threadId });
    }
  }, [socket, threadId]);

  useEffect(() => {
    if (!threadId && socket) {
      createThread();
    }
  }, [createThread, threadId, socket]);

  useEffect(() => {
    if (threadId && socket) {
      fetchMessages();
    }
  }, [fetchMessages, threadId, socket]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return (
    <Sheet>
      <SheetTrigger
        onClick={connect}
        className="z-50 fixed bottom-5 right-5 w-[4em] h-[4em] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
      >
        <MessageCircle className="text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>JobernifyAI</SheetTitle>
          <SheetDescription>
            Chat with JobernifyAI for job recommendations, career advice, and
            more.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {error && (
            <div className="p-2 rounded bg-red-100 text-red-700">{error}</div>
          )}
          <div className="flex flex-col overflow-y-auto max-h-[60vh] border p-4 rounded-lg bg-gray-50">
            {messages.map((msg, idx) => {
              console.log(msg);

              return (
                <div
                  key={idx}
                  className={`p-2 rounded mb-2 ${
                    msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-white'
                  } shadow`}
                >
                  {msg.role === 'assistant' ? (
                    <div>{msg.content}</div>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className="p-2 rounded mb-2 bg-white shadow">
                Assistant is typing...
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow"
              disabled={!threadId || !newMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default JobernifyAi;
