import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Seeker } from 'src/models/seekers/schemas/seeker.schema';
import { Employer } from 'src/models/employers/schemas/employer.schema';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SignInDto) {
    const { email, password } = signinDto;

    let user = await this.seekerModel.findOne({ email }).select('+password');

    if (!user) {
      user = await this.employerModel.findOne({ email }).select('+password');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user instanceof Seeker ? 'seeker' : 'employer',
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: payload.role,
    };
  }
}
