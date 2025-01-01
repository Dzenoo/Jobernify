import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';

import { TwoFactorAuthService } from '../services/two-factor-auth.service';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { TwoFactorCodeDto } from '../dto/two-factor.dto';

@Controller('/2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  async generate2FA(@Request() req: any) {
    const userId = req.user.userId;

    const { secret, otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthSecret(userId);

    return { secret, otpauthUrl };
  }

  @Post('/verify-setup')
  @UseGuards(JwtAuthGuard)
  async verifySetup(@Request() req, @Body() body: TwoFactorCodeDto) {
    const userId = req.user.userId;
    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      userId,
      body.code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid authentication code');
    }

    await this.twoFactorAuthService.setTwoFactorAuthEnabled(userId, true);

    return {
      statusCode: HttpStatus.OK,
      message: 'Two-Factor Authentication enabled successfully.',
    };
  }

  @Post('/disable')
  @UseGuards(JwtAuthGuard)
  async disable2FA(@Request() req, @Body() body: TwoFactorCodeDto) {
    const userId = req.user.userId;

    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      userId,
      body.code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid code, 2FA not disabled');
    }

    await this.twoFactorAuthService.setTwoFactorAuthEnabled(userId, false);

    return {
      statusCode: HttpStatus.OK,
      message: 'Two-Factor Authentication disabled successfully.',
    };
  }
}
