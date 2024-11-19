import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly seekersService: SeekersService,
    private readonly employersService: EmployersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.seekersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
