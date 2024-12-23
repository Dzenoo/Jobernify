import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SeekersService } from 'src/models/seekers/seekers.service';
import { EmployersService } from 'src/models/employers/employers.service';
import { SeekerDocument } from 'src/models/seekers/schemas/seeker.schema';
import { EmployerDocument } from 'src/models/employers/schemas/employer.schema';

@Injectable()
export class GoogleAuthService {
  constructor(
    private seekersService: SeekersService,
    private employersService: EmployersService,
    private jwtService: JwtService,
  ) {}

  async googleSignup(req: any, type: 'seeker' | 'employer') {
    if (!req.user) {
      throw new UnauthorizedException('No user from Google');
    }

    const { email, firstName, lastName, picture } = req.user;

    // 1. Check if user is found in Seeker or Employer
    const [existingSeeker, existingEmployer] = (await Promise.all([
      this.seekersService.findOneByEmail(email),
      this.employersService.findOneByEmail(email),
    ])) as [SeekerDocument, EmployerDocument];

    // 2. If user already exists in *either* table => conflict (they should go to login)
    if (existingSeeker) {
      throw new ConflictException(
        'This email is already registered as a Seeker. Please log in instead.',
      );
    }
    if (existingEmployer) {
      throw new ConflictException(
        'This email is already registered as an Employer. Please log in instead.',
      );
    }

    // 3. If user not found, create them
    let newUser: SeekerDocument | EmployerDocument;

    if (type === 'seeker') {
      newUser = (await this.seekersService.createOne({
        email,
        first_name: firstName,
        last_name: lastName,
        image: picture,
        isGoogleAccount: true,
        password: null,
        emailVerified: true,
      })) as SeekerDocument;
    } else {
      // employer
      newUser = (await this.employersService.createOne({
        email,
        name: firstName + ' ' + lastName,
        image: picture,
        address: '',
        size: '',
        industry: '',
        isGoogleAccount: true,
        password: null,
        emailVerified: true,
      })) as EmployerDocument;
    }

    if (!newUser) {
      throw new InternalServerErrorException('Error creating user from Google');
    }

    // 4. Issue JWT after creation
    const payload = { sub: newUser._id.toString(), role: type };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: `Account created via Google (${type}) and logged in`,
      access_token,
      role: newUser.role,
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('No user from Google');
    }

    const { email, firstName, lastName, picture } = req.user;

    // 1. Check if a user with this email exists in Seekers or Employers
    const [existingSeeker, existingEmployer] = (await Promise.all([
      this.seekersService.findOneByEmail(email),
      this.employersService.findOneByEmail(email),
    ])) as [SeekerDocument, EmployerDocument];

    // 2. If found in both => conflict (unlikely, but you can handle it)
    if (existingSeeker && existingEmployer) {
      throw new ConflictException(
        'Email is already registered as both Seeker and Employer.',
      );
    }

    // 3. If found in Seeker => log them in
    if (existingSeeker) {
      // If it’s not flagged as Google account, unify it
      if (!existingSeeker.isGoogleAccount) {
        await this.seekersService.findAndUpdateOne(
          { _id: existingSeeker._id },
          {
            isGoogleAccount: true,
            image: picture,
          },
        );
      }

      const payload = { sub: existingSeeker._id, role: 'seeker' };
      const jwt = await this.jwtService.signAsync(payload);

      return {
        message: 'Logged in (existing Seeker via Google)',
        access_token: jwt,
        role: existingSeeker.role,
      };
    }

    // 4. If found in Employer => log them in
    if (existingEmployer) {
      if (!existingEmployer.isGoogleAccount) {
        await this.employersService.findOneByIdAndUpdate(
          String(existingEmployer._id),
          { isGoogleAccount: true, image: picture },
        );
      }

      const payload = { sub: existingEmployer._id, role: 'employer' };
      const jwt = await this.jwtService.signAsync(payload);

      return {
        message: 'Logged in (existing Employer via Google)',
        access_token: jwt,
        role: existingEmployer.role,
      };
    }

    // 5. If not found in either table => can’t log in
    throw new NotFoundException(
      'No account exists with that Google email. Please sign up first.',
    );
  }
}
