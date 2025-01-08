import { Socket } from 'socket.io';

import { WsJwtGuard } from '@/authentication/guards/ws-jwt.guard';

type SocketIOMiddleware = {
  (client: Socket, next: (error?: Error) => void): void;
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      WsJwtGuard.validateToken(client);
      next();
    } catch (error) {
      next(error);
    }
  };
};
