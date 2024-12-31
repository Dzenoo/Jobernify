import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();

    const payload = WsJwtGuard.validateToken(client);

    if ((payload as any).role === 'seeker') {
      client.handshake.auth.seekerId = payload.sub;
    } else {
      client.handshake.auth.employerId = payload.sub;
    }

    return true;
  }

  static validateToken(client: Socket) {
    const cookieHeader = client.handshake.headers.cookie;

    if (!cookieHeader) {
      throw new UnauthorizedException('No cookies found!');
    }

    const parsedCookies = cookie.parse(cookieHeader);
    const token = parsedCookies.access_token;

    if (!token) {
      throw new UnauthorizedException('Token missing!');
    }

    try {
      const payload = verify(token, process.env.JWT_SECRET);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
