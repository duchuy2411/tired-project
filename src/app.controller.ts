import { Controller, Get, Post, Request, UseGuards, Body, HttpException, HttpStatus, Response } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { AppLogger } from './logger/logger.service';
import { AuthGuard } from '@nestjs/passport';

import { UserDecor } from './users/users.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly appLogger: AppLogger,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@UserDecor() userInfo, @Request() req, @Body() body, @Response() response) {
    const findUser = await this.authService.login(body);
    console.log("==findUser==: ", findUser);

    if (!findUser) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    response.status(HttpStatus.OK).send(findUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('entity')
  async getEntity(@UserDecor() userInfo, @Request() req) {
    this.appLogger.warn("HELLO WORLD");
    console.log("===", userInfo);
    return "ok";
  }
}
