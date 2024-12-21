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
    const { authorization } = client.handshake.headers;
    const token: string = authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_SECRET);
    return payload;
  }
}
