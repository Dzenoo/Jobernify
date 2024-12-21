import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();

    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const token = client.handshake.query.token as string;

    if (!token) {
      throw new Error('Token missing in query');
    }

    try {
      const payload = verify(token, process.env.JWT_SECRET);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
