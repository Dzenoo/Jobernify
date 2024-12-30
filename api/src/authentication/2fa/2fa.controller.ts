import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Request,
  UnauthorizedException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TwoFactorAuthService } from './2fa.service';

@Controller('/2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  /**
   * STEP 1: Generate a TOTP secret (and store on user).
   * Return the secret & otpauthUrl so the front-end can render a QR code.
   */
  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  async generate2FA(
    @Request() req: any,
    @Query('role') role: 'seeker' | 'employer',
  ) {
    const userId = req.user.userId;

    const { secret, otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthSecret(userId, role);

    return { secret, otpauthUrl };
  }

  /**
   * STEP 2: Verify the TOTP code from the user’s authenticator app.
   * If successful, enable 2FA.
   */
  @Post('/verify-setup')
  @UseGuards(JwtAuthGuard)
  async verifySetup(
    @Request() req,
    @Query('role') role: 'seeker' | 'employer',
    @Body() body: { code: string },
  ) {
    const userId = req.user.userId;
    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      userId,
      role,
      body.code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid authentication code');
    }

    // Enable 2FA now that it’s confirmed
    await this.twoFactorAuthService.setTwoFactorAuthEnabled(userId, role, true);

    return { message: 'Two-Factor Authentication enabled successfully.' };
  }

  /**
   * (Optional) Disable 2FA. Typically requires the user to re-enter their code.
   */
  @Post('/disable')
  @UseGuards(JwtAuthGuard)
  async disable2FA(
    @Request() req,
    @Query('role') role: 'seeker' | 'employer',
    @Body() body: { code: string },
  ) {
    const userId = req.user.userId;

    // Check code before disabling for security
    const isValid = await this.twoFactorAuthService.verifyTwoFactorAuthToken(
      userId,
      role,
      body.code,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid code, 2FA not disabled');
    }

    await this.twoFactorAuthService.setTwoFactorAuthEnabled(
      userId,
      role,
      false,
    );
    return { message: 'Two-Factor Authentication disabled successfully.' };
  }
}
