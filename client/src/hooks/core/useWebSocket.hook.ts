import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface WebSocketHookOptions {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  socket: Socket | null;
}

/**
 * Custom React hook for managing a WebSocket connection using Socket.IO.
 *
 * @param options - Configuration options for the WebSocket connection
 * @returns An object containing connection status, control functions, and the socket instance
 */
const useWebSocket = ({
  url,
  onConnect,
  onDisconnect,
  onError,
}: WebSocketHookOptions): UseWebSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const connect = useCallback(() => {
    if (socket) return;

    const newSocket = io(url, { transports: ['websocket'] });

    const handleConnect = () => {
      if (!connected) {
        setConnected(true);
        console.log('WebSocket connected');
        onConnect?.();
      }
    };

    const handleDisconnect = () => {
      if (connected) {
        setConnected(false);
        console.log('WebSocket disconnected');
        onDisconnect?.();
      }
    };

    const handleError = (error: Error) => {
      console.error('WebSocket connection error:', error);
      onError?.(error);
    };

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    newSocket.on('connect_error', handleError);

    setSocket(newSocket);
  }, [socket, url, connected, onConnect, onDisconnect, onError]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
      setSocket(null);
      setConnected(false);
      console.log('WebSocket connection terminated');
    }
  }, [socket]);

  useEffect(() => {
    // Optionally
    // connect();

    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connected,
    connect,
    disconnect,
    socket,
  };
};

export { useWebSocket };
