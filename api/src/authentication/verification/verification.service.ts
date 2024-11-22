import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  Employer,
  EmployerDocument,
} from 'src/models/employers/schemas/employer.schema';
import {
  Seeker,
  SeekerDocument,
} from 'src/models/seekers/schemas/seeker.schema';

import { Model } from 'mongoose';

import { uuidv7 } from 'uuidv7';
import { VERIFICATION_TOKEN_EXPIRATION_TIME } from 'src/common/constants';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(Seeker.name) private readonly seekerModel: Model<Seeker>,
    @InjectModel(Employer.name) private readonly employerModel: Model<Employer>,
  ) {}

  async verifyEmail(
    token: string,
    userType: 'seeker' | 'employer',
  ): Promise<any> {
    let user: SeekerDocument | EmployerDocument;

    if (userType === 'seeker') {
      user = await this.seekerModel.findOne({ verificationToken: token });
    } else if (userType === 'employer') {
      user = await this.employerModel.findOne({ verificationToken: token });
    }

    if (!user) {
      throw new ConflictException('Invalid token.');
    }

    if (user.verificationExpiration < new Date()) {
      throw new UnauthorizedException();
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiration = undefined;

    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: 'Email successfully verified.',
    };
  }

  create() {
    const verificationToken = uuidv7();
    const verificationExpiration =
      Date.now() + VERIFICATION_TOKEN_EXPIRATION_TIME;

    return { verificationToken, verificationExpiration };
  }
}
