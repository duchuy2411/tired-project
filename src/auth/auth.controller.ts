import { Controller, Get, Post, Request, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Request() req, @Body() body) {
    const accessToken = await this.authService.signup(body);
    if (!accessToken) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return accessToken;
  }
}
