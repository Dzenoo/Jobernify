import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuthentication } from './useAuthentication.hook';

interface WebSocketHookOptions {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

const useWebSocket = ({
  url,
  onConnect,
  onDisconnect,
  onError,
}: WebSocketHookOptions): UseWebSocketReturn => {
  const { token } = useAuthentication().getCookieHandler();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socket) return;

    const newSocket = io(url, {
      transports: ['websocket'],
      query: {
        token,
      },
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      onConnect?.();
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      onDisconnect?.();
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    });

    setSocket(newSocket);
  }, [socket, url, onConnect, onDisconnect, onError]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { isConnected, socket, connect, disconnect };
};

export { useWebSocket };
