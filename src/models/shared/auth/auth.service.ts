import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Seeker,
  SeekerDocument,
} from 'src/models/seekers/schemas/seeker.schema';
import {
  Employer,
  EmployerDocument,
} from 'src/models/employers/schemas/employer.schema';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
    // private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SignInDto) {
    const { email, password } = signinDto;

    let user: SeekerDocument | EmployerDocument;

    // user = await this.seekerModel.findOne({ email }).select('+password');

    // if (!user) {
    //   user = await this.employerModel.findOne({ email }).select('+password');
    // }

    // if (!user) {
    //   throw new Error('Invalid email or password');
    // }

    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) {
    //   throw new Error('Invalid email or password');
    // }

    // const payload = { email: user.email, userId: user._id };
    // const token = this.jwtService.sign(payload);

    // return {
    //   access_token: token,
    //   userType: user instanceof Seeker ? 'seeker' : 'employer',
    // };
  }
}
